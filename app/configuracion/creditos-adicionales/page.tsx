"use client"
import { Nav } from "@/components/configuration";
import { Button, ButtonAI, ButtonSubmit, Input, Popup } from "@/components/ui";
import { NumberFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CardNumber, CardPayment, createCardToken, ExpirationDate, initMercadoPago, SecurityCode, StatusScreen } from '@mercadopago/sdk-react';
import { IClient } from "@/interfaces";
import axios from "axios";
import { useSession } from "next-auth/react";
import Cookies from 'js-cookie'
import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/`, {
    transports: ['websocket']
})

declare global {
    interface Window {
      MercadoPago: any;
      cardPaymentBrickController: any;
    }
}

declare const fbq: Function

export default function Page () {

  const [client, setClient] = useState<IClient>({ email: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState({ textAI: '0', imagesAI: '0', videosAI: '0', conversationsAI: '0', emails: '0' })
  const [loadingPayment, setLoadingPayment] = useState(true)
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })

  const { data: session } = useSession()

  const router = useRouter()

  const prices = {
    textAI: 10,
    imagesAI: 40,
    videosAI: 250,
    conversationsAI: 20,
    emails: 3
  };

  const total = useMemo(() => {
    return (
      (Number(credits.textAI) * prices.textAI) +
      (Number(credits.imagesAI) * prices.imagesAI) +
      (Number(credits.videosAI) * prices.videosAI) +
      (Number(credits.conversationsAI) * prices.conversationsAI) +
      (Number(credits.emails) * prices.emails)
    );
  }, [credits]);

  const clientRef = useRef<IClient>(client)
  const initializationRef = useRef({ amount: 0 });
  const creditsRef = useRef(credits)

  useEffect(() => {
    initializationRef.current.amount = total;
  }, [total]);

  useEffect(() => {
    creditsRef.current = credits;
  }, [credits]);

  useEffect(() => {
    async function loadKey() {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
        headers: {
          'x-tenant-id': process.env.NEXT_PUBLIC_MAIN_TENANT_ID
        }
      });
      console.log(res.data)

      initMercadoPago(res.data.mercadoPago.publicKey);
    }

    loadKey();
  }, []);
  
  const getClient = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-email/${session?.user.email}`, {
      headers: {
        'x-tenant-id': process.env.NEXT_PUBLIC_MAIN_TENANT_ID
      }
    })
    setClient(res.data)
    clientRef.current = res.data
  }

  useEffect(() => {
      getClient()
    }, [])

  const inputChange = (e: any) => {
    setCredits({ ...credits, [e.target.name]: e.target.value })
  }

  const onSubmit = async (formData: any) => {
    // callback llamado al hacer clic en el botón enviar datos
    if (!loading) {
      setLoading(true)
      setError('')
      return new Promise<void>((resolve, reject) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/process_payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-tenant-id': process.env.NEXT_PUBLIC_MAIN_TENANT_ID!
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then(async (response) => {
            const price = Number(initializationRef.current.amount)
            const newEventId = new Date().getTime().toString()
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pay`, { firstName: clientRef.current.firstName, lastName: clientRef.current.lastName, email: clientRef.current.email, phone: clientRef.current.phone, typeService: 'Pago unico', typePrice: 'El precio incluye el IVA', price: price, state: 'Pago realizado', fbp: Cookies.get('_fbp'), fbc: Cookies.get('_fbc'), pathname: 'https://app.upviser.cl/configuracion/creditos-adicionales', eventId: newEventId }, {
                headers: {
                    'x-tenant-id': process.env.NEXT_PUBLIC_MAIN_TENANT_ID
                }
            })
            if (typeof fbq === 'function') {
              fbq('track', 'Purchase', { first_name: clientRef.current.firstName, last_name: clientRef.current.lastName, email: clientRef.current.email, phone: clientRef.current.phone && clientRef.current.phone !== '' ? `56${clientRef.current.phone}` : undefined, content_name: 'Compra de créditos', currency: "clp", value: price, contents: { id: 'Compra de créditos', item_price: price, quantity: 1 }, fbc: Cookies.get('_fbc'), fbp: Cookies.get('_fbp'), event_source_url: `https://app.upviser.cl/configuracion/creditos-adicionales` }, { eventID: newEventId })
            }
            socket.emit('newNotification', { title: 'Nuevo pago recibido:', description: 'Compra de créditos adicionales', url: '/pagos', view: false })
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notification`, { title: 'Nuevo pago recibido:', description: 'Compra de créditos adicionales', url: '/pagos', view: false }, {
                headers: {
                    'x-tenant-id': process.env.NEXT_PUBLIC_MAIN_TENANT_ID
                }
            })
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/shop-login-admin`, { textAIAdd: creditsRef.current.textAI, imagesAIAdd: creditsRef.current.imagesAI, videosAIAdd: creditsRef.current.videosAI, conversationsAIAdd: creditsRef.current.conversationsAI, emailsAdd: creditsRef.current.emails })
            setLoading(false)
            resolve();
          })
          .catch(async (error) => {
            reject();
          });
      })
    }
  };

  const onError = async (error: any) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };
    
  const onReady = async () => {
    setLoadingPayment(false)
  };

  const cardPaymentMemo = useMemo(() => {
    // Verificar que initialization.amount sea un número y mayor que 0
    if (typeof initializationRef.current.amount === 'number' && initializationRef.current.amount > 0) {
      return (
        <CardPayment
          initialization={initializationRef.current}
          onSubmit={onSubmit}
          onReady={onReady}
          onError={onError}
          customization={{
          visual: {
            style: {
              theme: 'flat',
              customVariables: {
                baseColor: '#2167e5',
                formBackgroundColor: "#11111100",
                textPrimaryColor: '#808080'
              },
            },
            texts: {
              formTitle: 'Tarjeta de crédito o débito'
            }
          }
        }}
        />
      );
    }
    return null; // No renderizar CardPayment si la condición no se cumple
  }, [initializationRef.current.amount]);

  return (
    <>
      <Popup popup={popup} setPopup={setPopup} config="a">
        <div className='flex flex-col gap-4 sticky border-b top-0 z-50 p-6 md:p-8 bg-white dark:bg-neutral-800 dark:border-neutral-700'>
          <p className='text-center text-2xl font-medium'>Comprar créditos adicionales</p>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <p className='text-center text-lg'>Neto: ${NumberFormat(initializationRef.current.amount / 119 * 100)}</p>
              <p className='text-center text-lg'>IVA: ${NumberFormat(initializationRef.current.amount / 119 * 19)}</p>
            </div>
            <div className='flex gap-4 w-fit m-auto'>
              <p className='text-center text-3xl font-semibold'>${NumberFormat(initializationRef.current.amount)}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 p-6 md:p-8'>
          <p className='text-lg font-medium'>Datos de contacto</p>
          <div className='flex flex-col gap-2'>
            <p>Email</p>
            <Input placeholder='Email' change={(e: any) => {
              setClient({ ...client, email: e.target.value })
              clientRef.current = { ...client, email: e.target.value }
            }} value={client.email} />
          </div>
          <div className='flex gap-4'>
            <div className='flex flex-col gap-2 w-1/2'>
              <p>Nombre</p>
              <Input placeholder='Nombre' change={(e: any) => {
                setClient({ ...client, firstName: e.target.value })
                clientRef.current = { ...client, firstName: e.target.value }
              }} value={client.firstName} />
            </div>
            <div className='flex flex-col gap-2 w-1/2'>
              <p>Apellido</p>
              <Input placeholder='Apellido' change={(e: any) => {
                setClient({ ...client, lastName: e.target.value })
                clientRef.current = { ...client, lastName: e.target.value }
              }} value={client.lastName} />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p>Teléfono</p>
            <div className='flex gap-2'>
              <p className='my-auto'>+56</p>
              <Input placeholder='Teléfono' change={(e: any) => {
                setClient({ ...client, phone: e.target.value })
                clientRef.current = { ...client, phone: e.target.value }
              }} value={client.phone} />
            </div>
          </div>
        </div>
        <div className='flex flex-col px-2 md:px-4'>
          <p className='text-lg font-medium px-4'>Pago</p>
          {cardPaymentMemo}
          {
            error !== ''
              ? <p className='px-2 py-1 bg-red-500 text-white w-fit'>{error}</p>
              : ''
          }
        </div>
      </Popup>
      <div className='w-full lg:w-3/4 flex flex-col gap-6'>
        <h2 className='font-medium mt-3 pb-3 border-b dark:border-neutral-700'>Creditos adicionales</h2>
        <div className="flex flex-col gap-2">
        <div className="flex gap-4 justify-between">
          <p>Conversaciones con agente IA</p>
          <Input type="number" name="conversationsAI" change={inputChange} config="w-20" placeholder="10" value={credits.conversationsAI} />
        </div>
        <div className="flex gap-4 justify-between">
          <p>Textos con IA</p>
          <Input type="number" name="textAI" change={inputChange} config="w-20" placeholder="10" value={credits.textAI} />
        </div>
        <div className="flex gap-4 justify-between">
          <p>Imagenes con IA</p>
          <Input type="number" name="imagesAI" change={inputChange} config="w-20" placeholder="10" value={credits.imagesAI} />
        </div>
        <div className="flex gap-4 justify-between">
          <p>Videos con IA</p>
          <Input type="number" name="videosAI" change={inputChange} config="w-20" placeholder="10" value={credits.videosAI} />
        </div>
        <div className="flex gap-4 justify-between">
          <p>Emails</p>
          <Input type="number" name="emails" change={inputChange} config="w-20" placeholder="10" value={credits.emails} />
        </div>
        <div className="flex gap-4 justify-between">
          <p className="font-medium">Precio total</p>
          <p className="font-medium">${NumberFormat(total)}</p>
        </div>
        <Button action={(e: any) => {
          e.preventDefault()
          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
          }, 10);
        }} config="w-full sm:w-fit">Comprar creditos adicionales</Button>
        </div>
      </div>
    </>
  )
}
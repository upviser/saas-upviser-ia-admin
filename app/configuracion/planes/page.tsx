"use client"
import { Nav } from "@/components/configuration";
import { Button, ButtonSubmit, Input, Popup } from "@/components/ui";
import { IClient, IFunnel, IPlan, IService } from "@/interfaces";
import { NumberFormat } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { io } from "socket.io-client";
import Cookies from 'js-cookie'
import { CardNumber, CardPayment, createCardToken, ExpirationDate, initMercadoPago, SecurityCode, StatusScreen } from '@mercadopago/sdk-react';
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

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
  const [service, setService] = useState<IService>()
  const [typePrice, setTypePrice] = useState('Mensual')
  const [plan, setPlan] = useState<IPlan>()
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loadingPayment, setLoadingPayment] = useState(true)
  const [table, setTable] = useState(false)

  const { data: session } = useSession()

  const router = useRouter()

  const clientRef = useRef<IClient>(client)
  const initializationRef = useRef({ amount: Number(service?.typePrice === '2 pagos' ? service?.typePay === 'Hay que agregarle el IVA al precio' ? Number(plan?.price) / 100 * 119 / 2 : Number(plan?.price) / 2 : service?.typePrice === 'Pago unico' ? service?.typePay === 'Hay que agregarle el IVA al precio' ? Number(plan?.price) / 100 * 119 : plan?.price : typePrice === 'Mensual' ? service?.typePay === 'Hay que agregarle el IVA al precio' ? Number(plan?.price) / 100 * 119 : plan?.price : service?.typePay === 'Hay que agregarle el IVA al precio' ? Number(plan?.anualPrice) / 100 * 119 : plan?.anualPrice) })

  initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!)

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

  const getService = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
      headers: {
        'x-tenant-id': process.env.NEXT_PUBLIC_MAIN_TENANT_ID
      }
    })
    const serviceFind = res.data.find((service: IService) => service.name === 'Upviser IA')
    setService(serviceFind)
  }

  useEffect(() => {
    getService()
  }, [])

  const onSubmit = async (formData: any) => {
    // callback llamado al hacer clic en el botón enviar datos
    if (!loading) {
      setLoading(true)
      setError('')
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (clientRef.current.email !== '' && clientRef.current.firstName !== '' && clientRef.current.lastName !== '' && clientRef.current.phone !== '') {
        if (emailRegex.test(clientRef.current.email)) {
          return new Promise<void>((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/suscribe`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cardToken: formData.token, price: initializationRef.current.amount, frequency: typePrice === 'Mensual' ? 'months' : 'years', email: clientRef.current.email }),
              })
                .then((response) => response.json())
                .then(async (response) => {
                  if (response.status === 'Processed') {
                    let currentClient = clientRef.current
                    if (currentClient.funnels?.length) {
                      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/funnels`, {
                        headers: {
                          'x-tenant-id': process.env.NEXT_PUBLIC_MAIN_TENANT_ID
                        }
                      })
                      const funnelsReversed = currentClient.funnels.toReversed()
                      const funnel: IFunnel = response.data.find((funnel: IFunnel) => funnel._id === funnelsReversed[0].funnel)
                      currentClient.funnels[currentClient.funnels.findIndex(funnel => funnel.funnel === funnelsReversed[0].funnel)].step = funnel.steps[currentClient.funnels.findIndex((funnel, i) => i === currentClient.funnels!.findIndex(funnel => funnel.funnel === funnelsReversed[0].funnel) + 1)]._id!
                    }
                    currentClient.services = [{ service: service?._id!, payStatus: 'Pago realizado', step: service?.steps[service?.steps.find(step => step._id === currentClient.services![0].step) ? service?.steps.findIndex(step => step._id === currentClient.services![0].step) + 1 : 0]._id }]
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clients`, currentClient, {
                        headers: {
                            'x-tenant-id': process.env.NEXT_PUBLIC_MAIN_TENANT_ID
                        }
                    })
                    const price = Number(typePrice === 'Mensual' ? initializationRef.current.amount : initializationRef.current.amount * 12)
                    const newEventId = new Date().getTime().toString()
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pay`, { firstName: clientRef.current.firstName, lastName: clientRef.current.lastName, email: clientRef.current.email, phone: clientRef.current.phone, service: service?._id, stepService: service?.steps[0]?._id, typeService: service?.typeService, typePrice: service?.typePrice, plan: plan?._id, price: price, state: 'Pago realizado', fbp: Cookies.get('_fbp'), fbc: Cookies.get('_fbc'), pathname: 'https://app.upviser.cl/configuracion/planes', eventId: newEventId, funnel: clientRef.current.funnels?.length ? clientRef.current.funnels[0].funnel : undefined, step: clientRef.current.funnels?.length ? clientRef.current.funnels[0].step : undefined, suscriptionId: response.id }, {
                        headers: {
                            'x-tenant-id': process.env.NEXT_PUBLIC_MAIN_TENANT_ID
                        }
                    })
                    if (typeof fbq === 'function') {
                      fbq('track', 'Purchase', { first_name: clientRef.current.firstName, last_name: clientRef.current.lastName, email: clientRef.current.email, phone: clientRef.current.phone && clientRef.current.phone !== '' ? `56${clientRef.current.phone}` : undefined, content_name: service?._id, currency: "clp", value: price, contents: { id: service?._id, item_price: price, quantity: 1 }, fbc: Cookies.get('_fbc'), fbp: Cookies.get('_fbp'), event_source_url: `https://app.upviser.cl/configuracion/planes` }, { eventID: newEventId })
                    }
                    socket.emit('newNotification', { title: 'Nuevo pago recibido:', description: service?.name, url: '/pagos', view: false })
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notification`, { title: 'Nuevo pago recibido:', description: service?.name, url: '/pagos', view: false }, {
                        headers: {
                            'x-tenant-id': process.env.NEXT_PUBLIC_MAIN_TENANT_ID
                        }
                    })
                    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/shop-login-admin`, { state: true, subscription: true, dateSubscription: new Date(), plan: plan?.name, textAI: plan?.name === 'Plan Esencial' ? 0 : plan?.name === 'Plan Avanzado' ? 100 : plan?.name === 'Plan Profesional' ? 200 : 0, imagesAI: plan?.name === 'Plan Esencial' ? 0 : plan?.name === 'Plan Avanzado' ? 40 : plan?.name === 'Plan Profesional' ? 80 : 0, videosAI: plan?.name === 'Plan Esencial' ? 0 : plan?.name === 'Plan Avanzado' ? 0 : plan?.name === 'Plan Profesional' ? 30 : 0, conversationsAI: plan?.name === 'Plan Esencial' ? 100 : plan?.name === 'Plan Avanzado' ? 200 : plan?.name === 'Plan Profesional' ? 400 : 0, emails: plan?.name === 'Plan Esencial' ? 1000 : plan?.name === 'Plan Avanzado' ? 2000 : plan?.name === 'Plan Profesional' ? 4000 : 0 })
                    setLoading(false)
                    resolve();
                  } else {
                    let currentClient = clientRef.current
                    currentClient.services![0].payStatus = 'Pago no realizado'
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clients`, currentClient, {
                      headers: {
                        'x-tenant-id': process.env.NEXT_PUBLIC_MAIN_TENANT_ID
                      }
                    })
                    resolve();
                  }
                })
                .catch(async (error) => {
                  let currentClient = clientRef.current
                  currentClient.services![0].payStatus = 'Pago no realizado'
                  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clients`, currentClient, {
                    headers: {
                      'x-tenant-id': process.env.NEXT_PUBLIC_MAIN_TENANT_ID
                    }
                  })
                  reject();
                });
          })
        } else {
          setError('Debes ingresar un correo valido')
        }
      } else {
        setError('Debes llenar todos los datos')
      }
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
          initialization={typePrice === 'Mensual' ? initializationRef.current : { amount: initializationRef.current.amount * 12 }}
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
              formTitle: service?.typePrice === 'Suscripción' || service?.typePrice === 'Pago variable con suscripción' ? 'Tarjeta de crédito' : 'Tarjeta de crédito o débito'
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
      <Head>
        <title>Planes</title>
      </Head>
      <Popup popup={popup} setPopup={setPopup} config="a">
      <div className='flex flex-col gap-4 sticky border-b top-0 z-50 p-6 md:p-8 bg-white dark:bg-neutral-800 dark:border-neutral-700'>
        <p className='text-center text-2xl font-medium'>{plan?.name}</p>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <p className='text-center text-lg'>Neto: ${NumberFormat(initializationRef.current.amount / 119 * 100)}</p>
            <p className='text-center text-lg'>IVA: ${NumberFormat(initializationRef.current.amount / 119 * 19)}</p>
          </div>
          <div className='flex gap-4 w-fit m-auto'>
            <p className='text-center text-3xl font-semibold'>${NumberFormat(initializationRef.current.amount)}</p>
            <p className='my-auto'>/ {typePrice === 'Mensual' ? 'Mes' : 'Anual'}</p>
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
        <h2 className='font-medium mt-3 pb-3 border-b dark:border-neutral-700'>Selecciona un plan</h2>
        <div className='m-auto p-1 rounded-full border dark:border-neutral-700'>
          <button onClick={() => setTypePrice('Mensual')} className={`px-2 py-1 rounded-full`} style={{ backgroundColor: typePrice === 'Mensual' ? '#2167e5' : '', color: typePrice === 'Mensual' ? '#ffffff' : '' }}>Mensual</button>
          <button onClick={() => setTypePrice('Anual')} className={`px-2 py-1 rounded-full`} style={{ backgroundColor: typePrice === 'Anual' ? '#2167e5' : '', color: typePrice === 'Anual' ? '#ffffff' : '' }}>Anual {Math.round(100 - Number(service?.plans?.plans[0].anualPrice) * 100 / (Number(service?.plans?.plans[0].price) * 12)) }%</button>
        </div>
        <div className='flex gap-6 justify-around flex-wrap'>
          {
            service?.plans?.plans.map((plan, index) => (
              <div className={`p-6 flex flex-col ${plan.recommended ? 'border-2 border-main' : 'border dark:border-neutral-700'} gap-4 w-full max-w-96 justify-between`} key={plan._id} style={{ borderRadius: '20px' }}>
                <div className='flex flex-col gap-4'>
                  {
                    plan.recommended
                      ? <p className='px-3 py-1 w-fit rounded-full text-white mx-auto -mt-10' style={{ backgroundColor: `#2167e5` }}>Más recomendado</p>
                      : ''
                  }
                  <p className='text-center font-medium text-xl'>{plan.name}</p>
                  <p className='m-auto'>{plan.description}</p>
                  <div className='flex gap-2 w-fit m-auto'>
                    <p className='text-center font-bold text-3xl'>${NumberFormat(Number(typePrice === 'Mensual' ? plan.price : Number(plan.anualPrice) / 12))}</p>
                    <p className='my-auto'>Mes</p>
                  </div>
                  {
                    plan.characteristics?.length
                      ? (
                        <>
                          <p className='font-medium text-lg'>{index === 0 ? 'Funcionalidades:' : `Todo lo anterior más:`}</p>
                          <div className='flex flex-col gap-2'>
                            {
                              plan.characteristics?.map(characteristic => characteristic ? <div key={characteristic} className='flex gap-2'><BiCheck className='my-auto bg-main' /><p>{characteristic}</p></div> : '')
                            }
                          </div>
                        </>
                      )
                      : ''
                  }
                </div>
                {
                  session?.user.plan === 'Prueba'
                    ? (
                      <Button config='w-full' action={(e: any) => {
                        e.preventDefault()
                        setPlan(plan)
                        initializationRef.current.amount = typePrice === 'Mensual' ? Number(plan.price) / 100 * 119 : Number(plan.anualPrice) / 100 * 119
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                        }, 10);
                      }}>Seleccionar plan</Button>
                    )
                    : plan.name.split(' ')[1].toLowerCase() === session?.user.plan.toLowerCase()
                      ? <Button config='w-full'>Plan actual</Button>
                      : (
                        <Button config='w-full' action={(e: any) => {
                          e.preventDefault()
                          setPlan(plan)
                          initializationRef.current.amount = typePrice === 'Mensual' ? Number(plan.price) / 100 * 119 : Number(plan.anualPrice) / 100 * 119
                          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                          setTimeout(() => {
                            setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                          }, 10);
                        }}>Seleccionar plan</Button>
                      )
                }
              </div>
            ))
          }
        </div>
        <button onClick={() => table ? setTable(false) : setTable(true)} className="m-auto flex gap-2">Ver todas las funcionalidades <IoIosArrowDown className={`text-xl my-auto transition-all duration-150 ${table ? 'rotate-180' : ''}`} /></button>
        {
          table
            ? (
              <div className={`overflow-x-auto rounded-2xl w-full border dark:border-neutral-700`}>
                <table className={`min-w-full table-auto rounded-xl`}>
                  <thead className="border-b dark:border-neutral-700">
                    <tr>
                      <th className='px-4 py-5 text-left font-medium'>Funcionalidades</th>
                      {
                        service?.plans?.plans.map((plan, idx) => (
                          <th key={plan._id} className='px-4 py-5 text-center font-medium'>{plan.name}</th>
                        ))
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      service?.plans?.functionalities.map((functionality, index) => (
                        <tr key={index} className="border-b dark:border-neutral-700">
                          <td className='p-4'>{functionality}</td>
                          {
                            service?.plans?.plans.map((plan) => (
                              <td key={plan._id} className={`p-4 text-center`}>
                                {
                                  // Buscar si la funcionalidad existe en el plan
                                  plan.functionalities?.some(f => f.name === functionality)
                                    ? (
                                      // Si la funcionalidad existe, muestra el valor de la funcionalidad
                                      plan.functionalities?.find(f => f.name === functionality)?.value === 'Si' ? <FaCheck className='m-auto' /> : plan.functionalities?.find(f => f.name === functionality)?.value
                                    ) 
                                    : '✘'
                                }
                              </td>
                            ))
                          }
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            )
            : ''
        }
      </div>
    </>
  )
}
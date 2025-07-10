"use client"
import { Nav } from '@/components/configuration'
import { Button, ButtonSubmit, Input, Textarea } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

export default function Page () {

  const [integrations, setIntegrations] = useState({
    idPhone: '',
    whatsappToken: '',
    idPage: '',
    messengerToken: '',
    apiToken: '',
    apiPixelId: '',
    googleAnalytics: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sessionInfo, setSessionInfo] = useState<{
    phone_number_id?: string;
    waba_id?: string;
  }>({});
  const [fbReady, setFbReady] = useState(false)

  const router = useRouter()

  const getIntegrations = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/integrations`)
    if (response.data) {
      setIntegrations(response.data)
    }
  }

  useEffect(() => {
    getIntegrations()
  }, [])

  useEffect(() => {
    const sdkId = 'facebook-jssdk';
    if (!document.getElementById(sdkId)) {
      const script = document.createElement('script');
      script.id = sdkId;
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FB_APP_ID!,
        cookie: true,
        xfbml: true,
        version: 'v20.0',
      });

      setFbReady(true); // 2. FB está listo
    };

    const sessionInfoListener = (event: MessageEvent) => {
      if (!['https://www.facebook.com', 'https://web.facebook.com'].includes(event.origin)) return;
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'WA_EMBEDDED_SIGNUP' && data.event === 'FINISH') {
          const { phone_number_id, waba_id } = data.data;
          setSessionInfo({ phone_number_id, waba_id });
        }
      } catch {}
    };

    window.addEventListener('message', sessionInfoListener);
    return () => window.removeEventListener('message', sessionInfoListener);
  }, []);

  const handleConnect = async () => {
    if (!fbReady) {
      console.warn('Facebook SDK aún no está listo.');
      return;
    }

    try {
      const response = await new Promise<any>((resolve, reject) => {
        window.FB.login(
          (res: any) => {
            if (res.authResponse) {
              resolve(res);
            } else {
              reject(new Error('Usuario canceló o no autorizó.'));
            }
          },
          {
            config_id: process.env.NEXT_PUBLIC_WHATSAPP_CONFIG_ID!,
            response_type: 'code',
            override_default_response_type: true,
            scope: 'business_management,whatsapp_business_management,whatsapp_business_messaging',
            extras: {
              feature: 'whatsapp_embedded_signup',
              version: 2,
              sessionInfoVersion: 3,
              setup: {},
            },
          }
        );
      });

      const code = response.authResponse.code;
      if (sessionInfo.phone_number_id && sessionInfo.waba_id) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp-token`, {
          code,
          phone_number_id: sessionInfo.phone_number_id,
        });
        if (res.data.success === 'OK') {
          getIntegrations();
        } else {
          console.error('No se ha podido crear el token correctamente.');
        }
      } else {
        console.error('No session info recibido antes del login.');
      }
    } catch (error) {
      console.error('Error en el proceso de conexión:', error);
    }
  };

  useEffect(() => {
    const id = 'facebook-jssdk';
    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.id = id;
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FB_APP_ID!,
        cookie: true,
        xfbml: false,
        version: 'v20.0',
      });
    };
  }, []);

  const handleConnectFacebook = async () => {
    window.FB.login(async (res: any) => {
      if (!res.authResponse) return console.error('Permiso denegado.');
      const userToken = res.authResponse.accessToken;
      try {
        const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/messenger-token`, { userToken });
        if (resp.data.success) {
          getIntegrations()
        } else {
          console.error('Error al guardar datos:', resp.data);
        }
      } catch (e) {
        console.error('Error API:', e);
      }
    }, {
      scope: [
        'pages_show_list',
        'pages_manage_metadata',
        'pages_messaging',
        'instagram_basic',
        'instagram_manage_messages'
      ].join(',')
    });
  };

  const handleSubmit = async () => {
    if (!loading) {
      setLoading(true)
      setError('')
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/integrations`, integrations)
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Integraciones</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 w-full lg:w-[calc(100%-250px)] dark:bg-neutral-800 dark:border-neutral-700'>
          <div className='flex m-auto w-full max-w-[1280px]'>
            {
              error !== ''
                ? <p className='px-2 py-1 bg-red-500 text-white w-fit h-fit my-auto'>{ error }</p>
                : ''
            }
            <div className='flex gap-6 ml-auto w-fit'>
              <ButtonSubmit action={handleSubmit} color='main' submitLoading={loading} textButton='Guardar datos' config='w-40' />
              <button onClick={() => router.refresh()} className='my-auto text-sm'>Descartar</button>
            </div>
          </div>
        </div>
        <div className='p-4 lg:p-6 w-full flex flex-col gap-6 overflow-y-auto bg-bg dark:bg-neutral-900 mb-16' style={{ height: 'calc(100% - 73px)' }}>
          <div className='flex w-full max-w-[1280px] mx-auto gap-6 flex-col lg:flex-row'>
            <Nav />
            <div className='w-full lg:w-3/4 flex flex-col gap-4'>
              <h2 className='font-medium mt-3 pb-3 border-b dark:border-neutral-700'>Integraciones</h2>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>Conectar Whatsapp</h3>
                {
                  (integrations.idPhone && integrations.idPhone !== '') && (integrations.whatsappToken && integrations.whatsappToken !== '')
                    ? fbReady ? <Button>Desconectar Whatsapp</Button> : ''
                    : fbReady ? <Button action={handleConnect}>Conectar Whatsapp</Button> : ''
                }
              </div>
              <div>
                <h3>Conectar Facebook/Instagram</h3>
                {
                  (integrations.messengerToken && integrations.messengerToken !== '') && (integrations.idPage && integrations.idPage !== '')
                    ? <Button>Desconectar Facebook/Instagram</Button>
                    : <Button action={handleConnectFacebook}>Conectar Facebook/Instagram</Button>
                }
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>ID del número de teléfono</h3>
                <Input change={(e: any) => setIntegrations({ ...integrations, idPhone: e.target.value })} value={integrations.idPhone} placeholder='ID del número de teléfono' config='h-40' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>Token Whatsapp App</h3>
                <Input change={(e: any) => setIntegrations({ ...integrations, whatsappToken: e.target.value })} value={integrations.whatsappToken} placeholder='Api Meta Token' config='h-40' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>ID de la página de Facebook</h3>
                <Input change={(e: any) => setIntegrations({ ...integrations, idPage: e.target.value })} value={integrations.idPage} placeholder='ID de la página de Facebook' config='h-40' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>Token Messenger App</h3>
                <Input change={(e: any) => setIntegrations({ ...integrations, messengerToken: e.target.value })} value={integrations.messengerToken} placeholder='Api Meta Token' config='h-40' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>Api Meta Token</h3>
                <Input change={(e: any) => setIntegrations({ ...integrations, apiToken: e.target.value })} value={integrations.apiToken} placeholder='Api Meta Token' config='h-40' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>Api Pixel Id</h3>
                <Input change={(e: any) => setIntegrations({ ...integrations, apiPixelId: e.target.value })} value={integrations.apiPixelId} placeholder='Api Pixel Id' config='h-40' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>Google Analytics</h3>
                <Input change={(e: any) => setIntegrations({ ...integrations, googleAnalytics: e.target.value })} value={integrations.googleAnalytics} placeholder='Google Analytics' config='h-40' />
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
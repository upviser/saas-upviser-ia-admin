"use client"
import { Nav } from '@/components/configuration'
import { ButtonSubmit, Textarea } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function Page () {

  const [politics, setPolitics] = useState({
    terms: '',
    privacy: '',
    devolutions: '',
    shipping: '',
    pay: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const { data: session } = useSession()

  const getPolitics = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/politics`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    if (response.data) {
      setPolitics(response.data)
    }
  }

  useEffect(() => {
    if (session?.tenantId) {
      getPolitics()
    }
  }, [session?.tenantId])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPolitics({ ...politics, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!loading) {
      setLoading(true)
      setError('')
      if (politics.privacy !== '' || politics.terms !== '') {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/politics`, politics, {
          headers: {
            'x-tenant-id': session?.tenantId
          }
        })
      } else {
        setError('Debes llenar al menos una politica')
      }
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Políticas de la tienda</title>
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
      <div className='w-full lg:w-3/4 flex flex-col gap-4'>
        <h2 className='font-medium mt-3 pb-3 border-b dark:border-neutral-700'>Políticas de la tienda</h2>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Terminos y condiciones</p>
          <Textarea change={handleChange} name='terms' value={politics.terms} placeholder='Términos y Condiciones' config='h-40' />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Política de privacidad</p>
          <Textarea change={handleChange} name='privacy' value={politics.privacy} placeholder='Política de privacidad' config='h-40' />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Política de devoluciones</p>
          <Textarea change={handleChange} name='devolutions' value={politics.devolutions} placeholder='Política de devoluciones' config='h-40' />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Política de envíos</p>
          <Textarea change={handleChange} name='shipping' value={politics.devolutions} placeholder='Política de envíos' config='h-40' />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Política de pagos</p>
          <Textarea change={handleChange} name='pay' value={politics.pay} placeholder='Política de pagos' config='h-40' />
        </div>
      </div>
    </>
  )
}
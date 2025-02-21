"use client"
import { Nav } from '@/components/configuration'
import { ButtonSubmit, Textarea } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'

export default function Page () {

  const [politics, setPolitics] = useState({
    terms: '',
    privacy: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const getPolitics = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/politics`)
    if (response.data) {
      setPolitics(response.data)
    }
  }

  useEffect(() => {
    getPolitics()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPolitics({ ...politics, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!loading) {
      setLoading(true)
      setError('')
      if (politics.privacy !== '' || politics.terms !== '') {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/politics`, politics)
      } else {
        setError('Debes llenar al menos una politica')
      }
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Politicas de la tienda</title>
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
        <div className='p-6 w-full flex flex-col gap-6 overflow-y-auto bg-bg dark:bg-neutral-900 mb-16' style={{ height: 'calc(100% - 73px)' }}>
          <div className='flex w-full max-w-[1280px] mx-auto gap-6 flex-col lg:flex-row'>
            <Nav />
            <div className='w-full lg:w-3/4 flex flex-col gap-4'>
              <h2 className='text-lg font-medium mt-3 pb-3 border-b dark:border-neutral-700'>Politicas de la tienda</h2>
              <div className='flex flex-col gap-2'>
                <h3 className='font-medium'>Terminos y condiciones</h3>
                <Textarea change={handleChange} name='terms' value={politics.terms} placeholder='Terminos y Condiciones' config='h-40' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='font-medium'>Politicas de privacidad</h3>
                <Textarea change={handleChange} name='privacy' value={politics.privacy} placeholder='Politicas de privacidad' config='h-40' />
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
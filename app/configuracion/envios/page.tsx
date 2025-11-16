"use client"
import { Nav } from '@/components/configuration'
import { ButtonSubmit, Input } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import { usePathname, useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function Page () {

  const [loading, setLoading] = useState(false)
  const [chilexpress, setChilexpress] = useState({ active: false, coberturaKey: '', cotizadorKey: '', enviosKey: '', cardNumber: '' })
  const [error, setError] = useState('')

  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const getChilexpress = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chilexpress`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setChilexpress(res.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getChilexpress()
    }
  }, [session?.tenantId])

  const handleSubmit = async () => {
    if (!loading) {
      setLoading(true)
      setError('')
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chilexpress`, chilexpress, {
        headers: {
          'x-tenant-id': session?.tenantId
        }
      })
      setLoading(false)
    }
  }

  return (
    <>
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
      <div className='w-full lg:w-3/4 flex flex-col gap-6'>
        <h2 className='font-medium mt-3 pb-3 border-b dark:border-neutral-700'>Envíos</h2>
        <div className='flex flex-col gap-4'>
          <p className='text-sm font-medium'>Selecciona los metodos de envío para tu tienda</p>
          <div className='flex gap-2'>
            <input type='checkbox' checked={chilexpress.active} onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.checked ? setChilexpress({ ...chilexpress, active: true }) : setChilexpress({ ...chilexpress, active: false }) } />
            <p className='text-sm'>Chilexpress</p>
          </div>
          {
            chilexpress.active
              ? (
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Código de cobertura</p>
                    <Input change={(e: ChangeEvent<HTMLInputElement>) => setChilexpress({ ...chilexpress, coberturaKey: e.target.value })} value={chilexpress.coberturaKey} placeholder='Código de cobertura' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Código de cotizador</p>
                    <Input change={(e: ChangeEvent<HTMLInputElement>) => setChilexpress({ ...chilexpress, cotizadorKey: e.target.value })} value={chilexpress.cotizadorKey} placeholder='Código de cotizador' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Código de envíos</p>
                    <Input change={(e: ChangeEvent<HTMLInputElement>) => setChilexpress({ ...chilexpress, enviosKey: e.target.value })} value={chilexpress.enviosKey} placeholder='Código de cotizador' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Número tarjeta cliente</p>
                    <Input change={(e: ChangeEvent<HTMLInputElement>) => setChilexpress({ ...chilexpress, cardNumber: e.target.value })} value={chilexpress.cardNumber} placeholder='Número tarjeta cliente' />
                  </div>
                </div>
              )
              : ''
          }
        </div>
      </div>
    </>
  )
}
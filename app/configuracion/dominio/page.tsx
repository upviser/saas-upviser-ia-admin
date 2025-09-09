"use client"
import { Nav } from '@/components/configuration'
import { ButtonSubmit, Input, Table } from '@/components/ui'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'

export default function Page () {

  const [loading, setLoading] = useState(false)
  const [domain, setDomain] = useState({ domain: '' })
  const [error, setError] = useState('')
  const [verified, setVerified] = useState(false)

  const router = useRouter()

  const getDomain = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/domain`)
    if (res.data.domain && res.data.domain !== '') {
        setDomain(res.data)
        if (!res.data.domain.includes('upviser.cl')) {
            setVerified(true)
        }
    }
  }

  useEffect(() => {
    getDomain()
  }, [])

  const handleSubmit = async () => {
    if (!loading) {
      setLoading(true)
      setError('')
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/domain`, domain)
      if (res.data.verified) {
        setVerified(true)
      } else {
        setError('No se ha podido conectar el dominio')
      }
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
        <div className='p-4 lg:p-6 w-full flex flex-col gap-6 overflow-y-auto bg-bg dark:bg-neutral-900' style={{ height: 'calc(100% - 73px)' }}>
          <div className='flex w-full max-w-[1280px] mx-auto gap-6 flex-col lg:flex-row'>
            <Nav />
            <div className='w-full lg:w-3/4 flex flex-col gap-6'>
              <h2 className='font-medium mt-3 pb-3 border-b dark:border-neutral-700'>Dominio</h2>
              <div className='flex flex-col gap-4'>
                <p className='text-sm font-medium'>Agrega un dominio personalizado a tu sitio web</p>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Dominio</p>
                  <Input change={(e: ChangeEvent<HTMLInputElement>) => setDomain({ domain: e.target.value })} value={domain.domain} placeholder='dominio' />
                </div>
              </div>
              {
                verified
                  ? (
                   <Table th={['Tipo', 'Nombre', 'Valor']}>
                      <tr className='bg-white dark:bg-neutral-800'>
                        <td className="p-2">A</td>
                        <td className="p-2">@</td>
                        <td className="p-2">216.198.79.1</td>
                      </tr>
                   </Table>
                  )
                  : ''
              }
            </div>
          </div>
        </div>
    </>
  )
}
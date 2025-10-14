"use client"
import { Button, Input, Spinner } from '@/components/ui'
import apiClient from '@/utils/axiosConfig'
import { generateTenantId } from '@/utils/tenantUtils'
import { signIn } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page () {

  const [loginData, setLoginData] = useState<any>({
    name: '',
    email: '',
    password: '',
    subdomain: '',
    type: 'Administrador',
    plan: '',
    textAI: 0,
    imagesAI: 0,
    videosAI: 0,
    conversationsAI: 0,
    emails: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [subdomainError, setSubdomainError] = useState('')

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const getPlan = () => {
      const planParam = searchParams.get("plan")
      const limitParam = searchParams.get("limit")
      if (limitParam === 'Que se limiten') {
        setLoginData({ ...loginData, plan: planParam ? planParam : '', imagesAI: planParam ? planParam === 'Esencial' ? 20 : planParam === 'Avanzado' ? 40 : planParam === 'Profesional' ? 80 : 0 : 0, videosAI: planParam ? planParam === 'Avanzado' ? 15 : planParam === 'Profesional' ? 30 : 0 : 0, conversationsAI: planParam ? planParam === 'Esencial' ? 250 : planParam === 'Avanzado' ? 600 : planParam === 'Profesional' ? 1500 : 0 : 0, emails: planParam ? planParam === 'Esencial' ? 1500 : planParam === 'Avanzado' ? 3500 : planParam === 'Profesional' ? 6000 : 0 : 0, textAI: planParam ? planParam === 'Esencial' ? 100 : planParam === 'Avanzado' ? 200 : planParam === 'Profesional' ? 400 : 0 : 0 })
      } else if (limitParam === 'Que sigan funcionando') {
        setLoginData({ ...loginData, plan: planParam ? planParam : '', imagesAI: planParam ? planParam === 'Esencial' ? 20 : planParam === 'Avanzado' ? 40 : planParam === 'Profesional' ? 80 : 0 : 0, videosAI: planParam ? planParam === 'Avanzado' ? 15 : planParam === 'Profesional' ? 30 : 0 : 0, conversationsAI: planParam ? planParam === 'Esencial' ? 250 : planParam === 'Avanzado' ? 600 : planParam === 'Profesional' ? 1500 : 0 : 0, emails: planParam ? planParam === 'Esencial' ? 1500 : planParam === 'Avanzado' ? 3500 : planParam === 'Profesional' ? 6000 : 0 : 0, textAI: planParam ? planParam === 'Esencial' ? 100 : planParam === 'Avanzado' ? 200 : planParam === 'Profesional' ? 400 : 0 : 0, imagesAIAdd: 0, videosAIAdd: 0, textAIAdd: 0, conversationsAIAdd: 0, emailsAdd: 0 })
      }
      
    }

    getPlan()
  }, [])

  const inputChange = (e: any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleSubdomainChange = async (e: any) => {
    const subdomain = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setLoginData({ ...loginData, subdomain })
  }

  const createAccount = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      setError('')
      setSubdomainError('')
      
      try {
        // Verificar que el subdominio esté disponible
        if (!loginData.subdomain) {
          setError('El subdominio es requerido')
          setLoading(false)
          return
        }

        // Generar tenantId único
        const tenantId = generateTenantId()
        
        // Crear cuenta con tenantId
        const accountData = {
          ...loginData,
          tenantId: tenantId
        }
        
        // Crear el usuario
        await apiClient.post('/shop-login', accountData)
        
        // Crear el tenant con el subdominio
        await apiClient.post('/tenant', {
          tenantId: tenantId,
          domain: `${loginData.subdomain}.upviser.cl`
        })

        await apiClient.get('/create-default-design')

        await apiClient.post('/domain', { domain: `${loginData.subdomain}.upviser.cl`, tenantId: tenantId })
        
        const res = await signIn('credentials', {
          email: loginData.email,
          password: loginData.password,
          redirect: false
        })
        
        if (res?.error) {
          setError(res.error)
          setLoading(false)
        }
        if (res?.ok) return window.location.replace('/')
      } catch (error: any) {
        setError(error.response?.data?.message || 'Error al crear la cuenta')
        setLoading(false)
      }
    }
  }

  return (
    <div className='bg-bg w-full h-full flex border-t-4 fixed top-0 z-50 px-4 border-main dark:bg-neutral-900'>
      <form onSubmit={createAccount} className='m-auto bg-white flex flex-col gap-4 w-[450px] border border-[#f3f3f3] rounded-xl p-6 sm:p-8 shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
        {
            error !== ''
            ? <p className='w-full p-2 bg-red-600 text-white text-center'>{error}</p>
            : ''
        }
        <h1 className='text-2xl font-medium'>Crear cuenta principal</h1>
        <div className='flex flex-col gap-2'>
            <p className='text-sm'>Nombre</p>
            <Input placeholder='Nombre' name='name' change={inputChange} value={loginData.name} />
        </div>
        <div className='flex flex-col gap-2'>
            <p className='text-sm'>Email</p>
            <Input placeholder='Email' name='email' change={inputChange} value={loginData.email} />
        </div>
        <div className='flex flex-col gap-2'>
            <p className='text-sm'>Subdominio</p>
            <div className='flex items-center gap-2'>
              <Input 
                placeholder='mi-empresa' 
                name='subdomain' 
                change={handleSubdomainChange} 
                value={loginData.subdomain} 
              />
              <span className='text-sm text-gray-500'>.upviser.cl</span>
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            <p className='text-sm'>Contraseña</p>
            <Input type='password' placeholder='********' name='password' change={inputChange} value={loginData.password} />
        </div>
        <Button type='submit' config='w-full' loading={loading}>Crear cuenta</Button>
        <div className='flex items-center justify-center gap-2 text-sm'>
          <p className='text-gray-600 dark:text-gray-400'>¿Ya tienes cuenta?</p>
          <button 
            type='button' 
            onClick={() => router.push('/ingresar')}
            className='text-main hover:text-main/80 font-medium transition-colors'
          >
            Inicia sesión
          </button>
        </div>
        </form>
      
    </div>
  )
}
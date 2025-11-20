"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineFileDone } from 'react-icons/ai'
import { BsCreditCard } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { MdOutlineIntegrationInstructions, MdOutlineLocalShipping } from 'react-icons/md'
import { TbWorldWww } from 'react-icons/tb'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { IoPodiumOutline } from 'react-icons/io5'
import axios from 'axios'
import { useSession } from 'next-auth/react'

export const Nav = () => {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [shopLoginAdmin, setShopLoginAdmin] = useState<any>()

  const menuItems = [
    { href: '/configuracion', label: 'Información del negocio', icon: HiOutlineInformationCircle },
    { href: '/configuracion/planes', label: 'Planes', icon: IoPodiumOutline },
    { href: '/configuracion/creditos-adicionales', label: 'Creditos adicionales', icon: IoPodiumOutline },
    { href: '/configuracion/dominio', label: 'Dominio', icon: TbWorldWww },
    { href: '/configuracion/usuarios', label: 'Usuarios', icon: FaUser },
    { href: '/configuracion/pasarela-de-pago', label: 'Pasarela de pago', icon: BsCreditCard },
    { href: '/configuracion/politicas', label: 'Políticas', icon: AiOutlineFileDone },
    { href: '/configuracion/integraciones', label: 'Integraciones', icon: MdOutlineIntegrationInstructions },
    { href: '/configuracion/envios', label: 'Envíos', icon: MdOutlineLocalShipping }
  ]

  const currentItem = menuItems.find(item => item.href === pathname)

  const getShopLoginAdmin = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/shop-login-admin`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setShopLoginAdmin(res.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getShopLoginAdmin()
    }
  }, [session])

  return (
    <div className='bg-white mr-3 ml-3 lg:mr-0 lg:ml-0 lg:w-1/4 h-fit rounded-xl border border-black/5 dark:bg-neutral-800 dark:border-neutral-700 fixed top-16 left-0 right-0 z-40 lg:sticky lg:top-0 lg:z-auto' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
      {/* Mobile Header - Solo visible en móviles */}
      <div className='lg:hidden'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='w-full flex items-center justify-between p-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200'
        >
          <div className='flex items-center gap-3'>
            <h1 className='font-medium text-gray-900 dark:text-white'>Configuración</h1>
            {currentItem && (
              <span className='text-sm text-gray-500 dark:text-gray-400'>
                - {currentItem.label}
              </span>
            )}
          </div>
          <div className='flex items-center gap-2'>
            {isOpen ? (
              <HiChevronUp className='w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200' />
            ) : (
              <HiChevronDown className='w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200' />
            )}
          </div>
        </button>
      </div>

      {/* Desktop Header - Solo visible en desktop */}
      <div className='hidden lg:block p-4'>
        <h1 className='font-medium text-gray-900 dark:text-white'>Configuración</h1>
      </div>

      {/* Menu Items */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 lg:max-h-screen lg:opacity-100'
      }`}>
        <div className='p-4 pt-0 lg:pt-4'>
          <div className='flex flex-col gap-1'>
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  className={`flex gap-2 ${
                    isActive 
                      ? 'bg-main text-white' 
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  } p-1.5 rounded-xl transition-all duration-200 text-sm group`}
                  href={item.href}
                  onClick={() => setIsOpen(false)} // Cerrar menú en móvil al hacer clic
                >
                  <Icon className={`${
                    isActive ? 'text-white' : 'text-main group-hover:text-main'
                  } my-auto text-lg transition-colors duration-200`} />
                  <span className='truncate'>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

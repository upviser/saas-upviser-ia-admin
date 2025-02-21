import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Button, Button2, ButtonSubmit, Input, Spinner2, Textarea } from '../ui'
import axios from 'axios'
import { IFunnel } from '@/interfaces'

interface Props {
    popupDeleteFunnel: any
    setPopupDeleteFunnel: any
    selectFunnel?: IFunnel
    setFunnels: any
    getFunnels: any
}

export const PopupDeleteFunnel: React.FC<Props> = ({ popupDeleteFunnel, setPopupDeleteFunnel, selectFunnel, setFunnels, getFunnels }) => {

  const [loading, setLoading] = useState(false)

  return (
      <div onClick={() => {
        if (!popupDeleteFunnel.mouse) {
          setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popupDeleteFunnel.view} ${popupDeleteFunnel.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/20 flex top-0 left-0 z-50`}>
        <div onMouseEnter={() => setPopupDeleteFunnel({ ...popupDeleteFunnel, mouse: true })} onMouseLeave={() => setPopupDeleteFunnel({ ...popupDeleteFunnel, mouse: false })} className={`${popupDeleteFunnel.opacity === 'opacity-1' ? 'scale-1': 'scale-90'} transition-transform duration-200 w-full max-w-[500px] max-h-[600px] overflow-y-auto p-6 rounded-xl flex flex-col gap-4 m-auto border bg-white shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          <p>¿Estas seguro que deseas eliminar el embudo: <span className='font-medium'>{selectFunnel?.funnel}</span>?</p>
          <div className='flex gap-6'>
            <ButtonSubmit submitLoading={loading} textButton='Eliminar' action={async (e: any) => {
              e.preventDefault()
              if (!loading) {
                setLoading(true)
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/funnel/${selectFunnel?._id}`)
                getFunnels()
                setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
                setLoading(false)
              }
            }} color='red-500' config='w-28' />
            <button onClick={(e: any) => {
              e.preventDefault()
              setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className='my-auto'>Cancelar</button>
          </div>
        </div>
      </div>
  )
}

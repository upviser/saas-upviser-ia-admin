"use client"
import { Nav } from "@/components/configuration"
import { Button2, ButtonRed, Popup, Spinner2, Table } from "@/components/ui"
import { PopupNewUser } from "@/components/user"
import { IUser } from "@/interfaces"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react'

export default function Page() {

  const [users, setUsers] = useState<IUser[]>([])
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popup2, setPopup2] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [user, setUser] = useState<IUser>()
  const [shopLogin, setShopLogin] = useState<any>()
  const [loading, setLoading] = useState(false)

  const { data: session } = useSession()

  const getUsers = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setUsers(res.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getUsers()
    }
  }, [session?.tenantId])

  const getShopLogin = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/shop-login-admin`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setShopLogin(res.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getShopLogin()
    }
  }, [session?.tenantId])

  return (
    <>
      <Popup popup={popup2} setPopup={setPopup2}>
        <p>¿Estas seguro que deseas eliminar el usuario {user?.name}?</p>
        <div className="flex gap-2">
          <ButtonRed action={async () => {
            if (!loading) {
              setLoading(true)
              await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/shop-login/${user?._id}`, {
                headers: {
                  'x-tenant-id': session?.tenantId
                }
              })
              getUsers()
              setPopup2({ ...popup2, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup2({ ...popup2, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
              setLoading(false)
            }
          }}>{loading ? <Spinner2 /> : 'Eliminar usuario'}</ButtonRed>
          <button onClick={() => {
            setPopup2({ ...popup2, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setPopup2({ ...popup2, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }}>Cancelar</button>
        </div>
      </Popup>
      <PopupNewUser popup={popup} setPopup={setPopup} user={user} setUser={setUser} getUsers={getUsers} shopLogin={shopLogin} setShopLogin={setShopLogin} popup2={popup2} setPopup2={setPopup2} />
      <div className='w-full lg:w-3/4 flex flex-col gap-6'>
        <h2 className='font-medium mt-3 pb-3 border-b dark:border-neutral-700'>Usuarios</h2>
        {
          shopLogin?.plan !== 'Esencial'
            ? (
                <Button2 action={(e: any) => {
                e.preventDefault()
                setUser({ email: '', type: 'Usuario', name: '', password: '', permissions: [] })
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                }, 10)
              }}>Nuevo usuario</Button2>
            )
            : ''
        }
        {
          users.length
            ? (
              <Table th={['Nombre', 'Correo', 'Tipo de cuenta']}>
                {
                  users.map((user, index) => (
                    <tr onClick={() => {
                      setUser(user)
                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                      }, 10)
                    }} className={`${index + 1 < users.length ? 'border-b border-border' : ''} text-sm bg-white cursor-pointer w-full transition-colors duration-150 dark:bg-neutral-800 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700`} key={user._id}>
                      <td className='p-3'>
                        <p>{user.name}</p>
                      </td>
                      <td className='p-3'>
                        <p>{user.email}</p>
                      </td>
                      <td className='p-3'>
                        <p>{user.type}</p>
                      </td>
                    </tr>
                  ))
                }
              </Table>
            )
            : ''
        }
      </div>
    </>
  )
}
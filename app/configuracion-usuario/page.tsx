"use client"
import { ButtonSubmit, Input } from "@/components/ui";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page () {

    const { data: session } = useSession()

    const [user, setUser] = useState<any>({ _id: session?.user._id, name: session?.user.name, email: session?.user.email })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async () => {
        if (!loading) {
            setLoading(true)
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/shop-login`, user, {
                headers: {
                    'x-tenant-id': session?.tenantId
                }
            })
            if (res.data.message) {
                setError(res.data.message)
            } else {
                await signOut()
            }
        }
    }

    return (
      <>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 w-full lg:w-[calc(100%-250px)] dark:bg-neutral-800 dark:border-neutral-700'>
                  <div className='flex m-auto w-full max-w-[1280px]'>
                    {
                      error !== ''
                        ? <p className='px-2 py-1 bg-red-500 text-white w-fit my-auto'>{ error }</p>
                        : ''
                    }
                    <div className='flex gap-6 ml-auto w-fit'>
                      <ButtonSubmit action={handleSubmit} color='main' submitLoading={loading} textButton='Guardar datos' config='w-40' />
                      <button onClick={() => router.push('/')} className='text-sm my-auto'>Descartar</button>
                    </div>
                  </div>
                </div>
        <div className='p-4 lg:p-6 bg-bg w-full h-full flex flex-col gap-6 dark:bg-neutral-900' style={{ overflow: 'overlay' }}>
          <div className='flex justify-between w-full max-w-[1280px] mx-auto'>
            <h1 className='text-2xl my-auto font-medium'>Configuración Usuario</h1>
          </div>
          <div className="flex flex-col gap-2">
            <p>Nombre</p>
            <Input change={(e: any) => setUser({ ...user, name: e.target.value })} value={user.name} placeholder="Nombre" />
          </div>
          <div className="flex flex-col gap-2">
            <p>Correo</p>
            <Input change={(e: any) => setUser({ ...user, email: e.target.value })} value={user.email} placeholder="Email" />
          </div>
          <div className="flex flex-col gap-2">
            <p>Contraseña</p>
            <Input change={(e: any) => setUser({ ...user, password: e.target.value })} value={user.password} placeholder="********" />
          </div>
        </div>
      </>
    )
  }
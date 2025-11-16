"use client"
import { Nav } from "@/components/configuration";
import { Button, ButtonAI, ButtonSubmit, Input } from "@/components/ui";
import { NumberFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function Page () {

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState({ textAI: '0', imagesAI: '0', videosAI: '0', conversationsAI: '0', emails: '0' })

  const router = useRouter()

  const prices = {
    textAI: 10,
    imagesAI: 50,
    videosAI: 300,
    conversationsAI: 20,
    emails: 3
  };

  const total = useMemo(() => {
    return (
      (Number(credits.textAI) * prices.textAI) +
      (Number(credits.imagesAI) * prices.imagesAI) +
      (Number(credits.videosAI) * prices.videosAI) +
      (Number(credits.conversationsAI) * prices.conversationsAI) +
      (Number(credits.emails) * prices.emails)
    );
  }, [credits]);

  const inputChange = (e: any) => {
    setCredits({ ...credits, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {

  }

  return (
    <>
              <div className='p-4 lg:p-6 w-full flex flex-col gap-6 overflow-y-auto bg-bg dark:bg-neutral-900 mb-16 pt-20 lg:pt-4' style={{ height: 'calc(100% - 73px)' }}>
                <div className='flex w-full max-w-[1280px] mx-auto gap-6 flex-col lg:flex-row'>
                  <Nav />
                  <div className='w-full lg:w-3/4 flex flex-col gap-6'>
                    <h2 className='font-medium mt-3 pb-3 border-b dark:border-neutral-700'>Creditos adicionales</h2>
                    <div className="flex flex-col gap-2">
                    <div className="flex gap-4 justify-between">
                      <p>Conversaciones con agente IA</p>
                      <Input name="conversationsAI" change={inputChange} config="w-20" placeholder="10" value={credits.conversationsAI} />
                    </div>
                    <div className="flex gap-4 justify-between">
                      <p>Textos con IA</p>
                      <Input name="textAI" change={inputChange} config="w-20" placeholder="10" value={credits.textAI} />
                    </div>
                    <div className="flex gap-4 justify-between">
                      <p>Imagenes con IA</p>
                      <Input name="imagesAI" change={inputChange} config="w-20" placeholder="10" value={credits.imagesAI} />
                    </div>
                    <div className="flex gap-4 justify-between">
                      <p>Videos con IA</p>
                      <Input name="videosAI" change={inputChange} config="w-20" placeholder="10" value={credits.videosAI} />
                    </div>
                    <div className="flex gap-4 justify-between">
                      <p>Emails</p>
                      <Input name="emails" change={inputChange} config="w-20" placeholder="10" value={credits.emails} />
                    </div>
                    <div className="flex gap-4 justify-between">
                      <p className="font-medium">Precio total</p>
                      <p className="font-medium">${NumberFormat(total)}</p>
                    </div>
                    <Button action={undefined} config="w-full sm:w-fit">Comprar creditos adicionales</Button>
                    </div>
                  </div>
                </div>
              </div>
    </>
  )
}
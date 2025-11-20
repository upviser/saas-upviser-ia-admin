import Link from "next/link"
import { Button2, ButtonSecondary2, Input } from "../ui"
import axios from "axios"
import { SlArrowDown, SlArrowUp } from "react-icons/sl"
import { FaRegEye } from "react-icons/fa"
import { IFunnel, IPage, IService } from "@/interfaces"

interface Props {
    pages: IPage[],
    setType: any,
    setMenu: any,
    setPart: any,
    setPages: any,
    session: any,
    handleMoveUp: any,
    handleMoveDown: any,
    setSelectPage: any,
    setPopupDeletePage: any,
    popupDeletePage: any,
    funnels: IFunnel[],
    setSelectFunnel: any,
    setPopupDeleteFunnel: any,
    popupDeleteFunnel: any,
    services: IService[],
    setSelectService: any,
    setPopupDeleteService: any,
    popupDeleteService: any,
    setError: any,
    setPopupPage: any,
    popupPage: any,
    whatsapp: any,
    setWhatsapp: any,
    id: any,
    instagram: any,
    setInstagram: any,
    chatView: any,
    setChatView: any,
    setNewFunnel: any,
    setTitle: any,
    setPopupNewFunnel: any,
    popupNewFunnel: any,
    style: any,
    newPage: any,
    setNewPage: any,
    productsOrder: any,
    editSubPage: any,
    setEditSubPage: any,
    loadingSubPage: any,
    setLoadingSubPage: any,
    domain: any
    shopLoginAdmin: any
}

export const Pages: React.FC<Props> = ({ domain, pages, setType, setMenu, setPart, setPages, session, handleMoveUp, handleMoveDown, setSelectPage, setPopupDeletePage, popupDeletePage, funnels, setSelectFunnel, setPopupDeleteFunnel, popupDeleteFunnel, services, setSelectService, setPopupDeleteService, popupDeleteService, setError, setPopupPage, popupPage, whatsapp, setWhatsapp, id, instagram, setInstagram, chatView, setChatView, setNewFunnel, setTitle, setPopupNewFunnel, popupNewFunnel, style, newPage, setNewPage, productsOrder, editSubPage, setEditSubPage, loadingSubPage, setLoadingSubPage, shopLoginAdmin }) => {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex gap-2 justify-between'>
        <h2 className='text-lg font-medium'>Páginas</h2>
        <Link href={`https://${domain?.domain}`} target='_blank' className='my-auto flex gap-1 transition-colors duration-150 hover:bg-neutral-100 p-1 rounded-md dark:hover:bg-neutral-800'><FaRegEye className='text-xl my-auto' />Ver sitio web</Link>
      </div>
      <div className='flex flex-col gap-2'>
        {
          pages.map((page, index) => {
            if (page.page !== 'Tienda' || (page.page === 'Tienda' && productsOrder?.length)) {
              return (
                <div key={page.slug} className='flex flex-col gap-2'>
                  <div className='flex gap-4' draggable onDragStart={() => setNewPage({ ...newPage, page: page.page, slug: page.slug })} onDragOver={(e) => e.preventDefault()} onDrop={async () => {
                    const oldPages = [...pages]
                    if (oldPages[index].subPage?.length) {
                      oldPages[index].subPage?.push({ page: newPage.page, slug: newPage.slug })
                    } else {
                      oldPages[index].subPage = [{ page: newPage.page, slug: newPage.slug }]
                    }
                    setPages(oldPages)
                    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: oldPages })
                  }}>
                    <button onClick={() => {
                      setType('Page')
                      setPart(page.page)
                    }} className='text-left w-full text-[15px]'>{page.page}</button>
                    <div className='flex gap-2'>
                      <div className='flex gap-1'>
                        <input type='checkbox' checked={page.header} onChange={async (e: any) => {
                          const newPages = [...pages]
                          newPages[index].header = e.target.checked
                          setPages(newPages)
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: newPages }, {
                          headers: {
                            'x-tenant-id': session?.tenantId
                          }
                        })
                        }} />
                        <p className='my-auto text-sm'>Menu</p>
                      </div>
                      {
                        page.header === true
                          ? (
                            <div className='flex gap-1'>
                              <input type='checkbox' checked={page.button === true ? true : false} onChange={async (e: any) => {
                                const newPages = [...pages]
                                newPages[index].button = e.target.checked
                                setPages(newPages)
                                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: newPages }, {
                          headers: {
                            'x-tenant-id': session?.tenantId
                          }
                        })
                              }} />
                              <p className='my-auto text-sm'>Boton</p>
                            </div>
                          )
                          : ''
                      }
                      <button onClick={() => handleMoveUp(index)}><SlArrowUp className='text-lg' /></button>
                      <button onClick={() => handleMoveDown(index)}><SlArrowDown className='text-lg' /></button>
                      {
                        page.slug !== 'tienda'
                          ? (
                            <button onClick={(e: any) => {
                              e.preventDefault()
                              setSelectPage(page)
                              setPopupDeletePage({ ...popupDeletePage, view: 'flex', opacity: 'opacity-0' })
                              setTimeout(() => {
                                setPopupDeletePage({ ...popupDeletePage, view: 'flex', opacity: 'opacity-1' })
                              }, 10)
                            }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                          )
                          : ''
                      }
                    </div>
                  </div>
                  {
                    page.subPage?.map((subPage, i) => (
                      <div key={subPage.slug} className='flex gap-2 ml-10 justify-between'>
                        {
                          editSubPage === i
                            ? (
                              <div className='flex gap-2'>
                                <Input value={subPage.page} change={(e: any) => {
                                  const newPages = [...pages]
                                  newPages[index].subPage![i].page = e.target.value
                                  setPages(newPages)
                                }} />
                                <Button2 action={async (e: any) => {
                                  e.preventDefault()
                                  if (!loadingSubPage) {
                                    setLoadingSubPage(true)
                                    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: pages })
                                    setEditSubPage(-1)
                                    setLoadingSubPage(false)
                                  }
                                }} loading={loadingSubPage}>Guardar</Button2>
                              </div>
                            )
                            : <p onClick={() => setEditSubPage(i)} className='text-[15px]'>{subPage.page}</p>
                        }
                        <button onClick={async (e: any) => {
                          e.preventDefault()
                          const oldPages = [...pages]
                          oldPages[index].subPage?.splice(i, 1)
                          setPages(oldPages)
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: oldPages })
                        }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                      </div>
                    ))
                  }
                </div>
              )
            }
          })
        }
        {
          productsOrder?.length
            ? (
              <>
                <div className='flex gap-4'>
                  <button onClick={() => setPart('Pagina de producto')} className='text-left w-full text-[15px]'>Pagina de producto</button>
                </div>
                <div className='flex gap-4'>
                  <button onClick={() => setPart('Pagina de categorias')} className='text-left w-full text-[15px]'>Pagina de categorias</button>
                </div>
                <div className='flex gap-4'>
                  <button onClick={() => setPart('Pagina de carrito')} className='text-left w-full text-[15px]'>Pagina de Carrito</button>
                </div>
                <div className='flex gap-4'>
                  <button onClick={() => setPart('Pagina de checkout')} className='text-left w-full text-[15px]'>Pagina de checkout</button>
                </div>
                <div className='flex gap-4'>
                  <button onClick={() => setPart('Pagina de cuenta')} className='text-left w-full text-[15px]'>Pagina de cuenta</button>
                </div>
              </>
            )
            : ''
        }
        <div className='flex gap-4'>
          <button onClick={() => setPart('Popup')} className='text-left w-full text-[15px]'>Popup</button>
        </div>
        <div className='flex gap-4'>
          <button onClick={() => setPart('Chat')} className='text-left w-full text-[15px]'>Chat</button>
        </div>
      </div>
      {
        shopLoginAdmin?.plan === 'Avanzado' || shopLoginAdmin?.plan === 'Profesional'
          ? (
            <>
              <h2 className='text-lg font-medium'>Embudos</h2>
              <div className='flex flex-col gap-2'>
                {
                  funnels.length
                    ? (
                      funnels.map((funnel, index) => (
                        <div key={funnel._id} className='flex gap-4 justify-between' draggable onDragStart={() => setNewPage({ ...newPage, page: funnel.funnel, slug: funnel.steps[0].slug })} onDragOver={(e) => e.preventDefault()}>
                          <button onClick={(e: any) => {
                            setType('Funnel')
                            setPart(funnel.funnel)
                            setSelectFunnel(funnel)
                          }} className='text-left w-full text-[15px]'>{funnel.funnel}</button>
                          <button onClick={(e: any) => {
                            e.preventDefault()
                            setSelectFunnel(funnel)
                            setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'flex', opacity: 'opacity-0' })
                            setTimeout(() => {
                              setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'flex', opacity: 'opacity-1' })
                            }, 10)
                          }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                        </div>
                      ))
                    )
                    : <p className='text-[15px]'>No hay embudos creados</p>
                }
              </div>
            </>
          )
          : ''
      }
      <h2 className='text-lg font-medium'>Servicios</h2>
      <div className='flex flex-col gap-2'>
        {
          services.length
            ? services.map((service, index) => {
              if (service.steps.some(step => step.slug && step.slug !== '')) {
                return (
                  <div key={service._id} className='flex gap-4 justify-between'>
                    <button onClick={(e: any) => {
                      setType('Service')
                      setPart(service.name)
                      setSelectService(service)
                    }} className='text-left w-full text-[15px]'>{service.name}</button>
                    <button onClick={(e: any) => {
                      e.preventDefault()
                      setSelectService(service)
                      setPopupDeleteService({ ...popupDeleteService, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopupDeleteService({ ...popupDeleteService, view: 'flex', opacity: 'opacity-1' })
                      }, 10)
                    }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                  </div>
                )
              } else {
                return ''
              }
            })
            : <p className='text-[15px]'>No hay servicios creados</p>
        }
      </div>
      <div className='flex flex-col gap-2'>
        <Button2 action={() => {
          setError('')
          setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-1' })
          }, 10)
        }} config='w-full'>Agregar pagina</Button2>
        {
          whatsapp
            ? (
              <button onClick={async(e: any) => {
                e.preventDefault()
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { whatsapp: false })
                setWhatsapp(false)
              }} className={`w-full bg-red-500 min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300 hover:bg-red-500/80`}>Desactivar boton Whatsapp</button>
            )
            : (
              <button onClick={async(e: any) => {
                e.preventDefault()
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { whatsapp: true })
                setWhatsapp(true)
              }} className={`w-full bg-green-500 min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300 hover:bg-green-500/80`}>Activar boton Whatsapp</button>
            )
        }
        {
          instagram
            ? (
              <button onClick={async(e: any) => {
                e.preventDefault()
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { instagram: false })
                setInstagram(false)
              }} className={`w-full bg-red-500 min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300 hover:bg-red-500/80`}>Desactivar boton Instagram</button>
            )
            : (
              <button onClick={async(e: any) => {
                e.preventDefault()
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { instagram: true })
                setInstagram(true)
              }} className={`w-full bg-purple-600 min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300 hover:bg-purple-600/80`}>Activar boton Instagram</button>
            )
        }
        {
          chatView
            ? (
              <button onClick={async(e: any) => {
                e.preventDefault()
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { chatView: false })
                setChatView(false)
              }} className={`w-full bg-red-500 min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300 hover:bg-red-500/80`}>Desactivar boton Chat</button>
            )
            : (
              <button onClick={async(e: any) => {
                e.preventDefault()
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { chatView: true })
                setChatView(true)
              }} className={`w-full min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300`} style={{ backgroundColor: style.primary }}>Activar boton Chat</button>
            )
        }
        {
          shopLoginAdmin?.plan === 'Avanzado' || shopLoginAdmin?.plan === 'Profesional'
            ? (
              <ButtonSecondary2 action={(e: any) => {
                e.preventDefault()
                setError('')
                setNewFunnel({ funnel: '', description: '', steps: [{ step: '', slug: '' }] })
                setTitle('Nuevo embudo')
                setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-1' })
                }, 10)
              }} config='w-full'>Agregar embudo</ButtonSecondary2>
            )
            : ''
        }
        <button onClick={(e: any) => setPart('Estilo')} className='mt-2 text-sm'>Editar estilo del sitio web</button>
      </div>
    </div>
  )
}
import axios from "axios"
import { BiArrowBack } from "react-icons/bi"
import { Pages } from "."
import { Button2, ButtonSubmit, Input, Select, Spinner, Textarea } from "../ui"
import Image from 'next/image'
import { ICall, IForm, IFunnel, IPage, IService } from "@/interfaces"

interface Props {
  pages: IPage[]
  part: any,
  type: any,
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
  loadingImage: any,
  setLoadingImage: any,
  setErrorImage: any,
  setStyle: any,
  productPage: any,
  setProductPage: any,
  cartPage: any,
  setCartPage: any,
  checkoutPage: any,
  setCheckoutPage: any,
  popupWeb: any,
  setPopupWeb: any,
  forms: IForm[],
  calls: ICall[],
  setTitleForm: any,
  setNewForm: any,
  popupForm: any,
  setPopupForm: any,
  setNewCall: any,
  popupCall: any,
  setPopupCall: any,
  setTitleMeeting: any,
  chat: any,
  setChat: any,
  step: any,
  setFunnels: any,
  setStep: any,
  setServices: any,
  selectService: IService,
  setNewService: any,
  popupService: any,
  setPopupService: any,
  loading: any,
  setLoading: any
  color: any
  header: any
  footer: any
  categoryPage: any
  domain: any
  loadingImage2: any
  setLoadingImage2: any
  errorImage2: any
  setErrorImage2: any
}

export const MenuDesign: React.FC<Props> = ({ domain, pages, part, type, setType, setMenu, setPart, setPages, session, handleMoveUp, handleMoveDown, setSelectPage, setPopupDeletePage, popupDeletePage, funnels, setSelectFunnel, setPopupDeleteFunnel, popupDeleteFunnel, services, setSelectService, setPopupDeleteService, popupDeleteService, setError, setPopupPage, popupPage, whatsapp, setWhatsapp, id, instagram, setInstagram, chatView, setChatView, setNewFunnel, setTitle, setPopupNewFunnel, popupNewFunnel, style, newPage, setNewPage, productsOrder, editSubPage, setEditSubPage, loadingSubPage, setLoadingSubPage, loadingImage, setLoadingImage, setErrorImage, setStyle, productPage, setProductPage, cartPage, setCartPage, checkoutPage, setCheckoutPage, popupWeb, setPopupWeb, forms, calls, setTitleForm, setNewForm, popupForm, setPopupForm, setNewCall, popupCall, setPopupCall, setTitleMeeting, chat, setChat, step, setFunnels, setStep, setServices, selectService, setNewService, popupService, setPopupService, loading, setLoading, color, header, footer, categoryPage, loadingImage2, setLoadingImage2, errorImage2, setErrorImage2 }) => {
  return (
    <div className='w-[350px] border-r hidden lg:flex flex-col justify-between bg-white dark:border-neutral-800 dark:bg-neutral-900' style={{ overflow: 'overlay' }}>
      {
        part === ''
          ? <Pages domain={domain} pages={pages} setType={setType} setMenu={setMenu} setPart={setPart} setPages={setPages} session={session} handleMoveUp={handleMoveUp} handleMoveDown={handleMoveDown} setSelectPage={setSelectPage} setPopupDeletePage={setPopupDeletePage} popupDeletePage={popupDeletePage} funnels={funnels} setSelectFunnel={setSelectFunnel} setPopupDeleteFunnel={setPopupDeleteFunnel} popupDeleteFunnel={popupDeleteFunnel} services={services} setSelectService={setSelectService} setPopupDeleteService={setPopupDeleteService} popupDeleteService={popupDeleteService} setError={setError} setPopupPage={setPopupPage} popupPage={popupPage} whatsapp={whatsapp} setWhatsapp={setWhatsapp} id={id} instagram={instagram} setInstagram={setInstagram} chatView={chatView} setChatView={setChatView} setNewFunnel={setNewFunnel} setTitle={setTitle} setPopupNewFunnel={setPopupNewFunnel} popupNewFunnel={popupNewFunnel} style={style} newPage={newPage} setNewPage={setNewPage} productsOrder={productsOrder} editSubPage={editSubPage} setEditSubPage={setEditSubPage} loadingSubPage={loadingSubPage} setLoadingSubPage={setLoadingSubPage} />
          : ''
      }
      {
        pages.map((page, i) => {
          if (part === page.page && type === 'Page') {
            return (
              <div key={page.slug} className='flex flex-col gap-4 p-4 mb-[104px] overflow-y-auto'>
                <div className='border-b pb-4 dark:border-neutral-700'>
                  <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto text-sm'>Volver</p></button>
                </div>
                <h2 className='text-lg font-medium'>{page.page}</h2>
                <h3 className='font-medium text-[15px]'>Seo</h3>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Meta titulo</p>
                  <Input placeholder='Meta titulo' value={page.metaTitle} change={(e: any) => {
                    const oldPages = [...pages]
                    oldPages[i].metaTitle = e.target.value
                    setPages(oldPages)
                  }} />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Meta descripción</p>
                  <Textarea placeholder='Meta descripción' value={page.metaDescription!} change={(e: any) => {
                    const oldPages = [...pages]
                    oldPages[i].metaDescription = e.target.value
                    setPages(oldPages)
                  }} />
                </div>
                <input type='file' onChange={async (e: any) => {
                  if (!loadingImage) {
                    setLoadingImage(true)
                    setErrorImage('')
                    const formData = new FormData();
                    formData.append('image', e.target.files[0]);
                    formData.append('name', e.target.files[0].name);
                    try {
                      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                        headers: {
                          accept: 'application/json',
                          'Accept-Language': 'en-US,en;q=0.8'
                        }
                      })
                      const oldPages = [...pages]
                      oldPages[i].image = data
                      setPages(oldPages)
                      setLoadingImage(false)
                    } catch (error) {
                      setLoadingImage(false)
                      setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                    }
                  }
                }} value={page.image} className='m-auto w-[320px] text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                {
                  loadingImage
                    ? (
                      <div className='flex w-full'>
                        <div className='w-fit m-auto'>
                          <Spinner />
                        </div>
                      </div>
                    )
                    : page.image && page.image !== ''
                      ? <Image src={page.image} alt={`Imagen SEO de la pagina ${page.page}`} width={500} height={500} />
                      : ''
                }
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Fondo</p>
                  <Select value={page.backgroundType!} change={(e: any) => {
                    const oldPages = [...pages]
                    oldPages[i].backgroundType = e.target.value
                    if (oldPages[i].backgroundType === 'Degradado') {
                      oldPages[i].bgType = 'linear'
                      oldPages[i].bgAngle = '0'
                    }
                    setPages(oldPages)
                  }}>
                    <option>Transparente</option>
                    <option>Color</option>
                    <option>Degradado</option>
                    <option>Imagen</option>
                  </Select>
                </div>
                {
                  page.backgroundType === 'Color'
                    ? (
                      <input type="color" onChange={(e: any) => {
                        const oldPages = [...pages]
                        oldPages[i].bgColor = e.target.value
                        setPages(oldPages)
                      }} value={page.bgColor} />
                    )
                    : ''
                }
                {
                  page.backgroundType === 'Degradado'
                    ? (
                      <div className="flex gap-2 flex-wrap">
                        <p>Color 1</p>
                        <input type="color" onChange={(e: any) => {
                          const oldPages = [...pages]
                          oldPages[i].bgColor1 = e.target.value
                          setPages(oldPages)
                        }} value={page.bgColor1} />
                        <p>Color 2</p>
                        <input type="color" onChange={(e: any) => {
                          const oldPages = [...pages]
                          oldPages[i].bgColor2 = e.target.value
                          setPages(oldPages)
                        }} value={page.bgColor2} />
                        <Select change={(e: any) => {
                          const oldPages = [...pages]
                          oldPages[i].bgType = e.target.value
                          setPages(oldPages)
                        }} value={page.bgType}>
                          <option>Lineal</option>
                          <option>Radial</option>
                        </Select>
                        {
                          page.bgType === 'Lineal'
                            ? <Input change={(e: any) => {
                              const oldPages = [...pages]
                              oldPages[i].bgAngle = e.target.value
                              setPages(oldPages)
                            }} placeholder="Angulo" value={page.bgAngle} />
                            : ''
                        }
                      </div>
                    )
                    : ''
                }
                {
                  page.backgroundType === 'Imagen'
                    ? (
                      <>
                        <input type='file' onChange={async (e: any) => {
                          if (!loadingImage) {
                            setLoadingImage2(true)
                            setErrorImage2('')
                            const formData = new FormData();
                            formData.append('image', e.target.files[0]);
                            formData.append('name', e.target.files[0].name);
                            try {
                              const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                                headers: {
                                  accept: 'application/json',
                                  'Accept-Language': 'en-US,en;q=0.8'
                                }
                              })
                              const oldPages = [...pages]
                              oldPages[i].bgImage = data
                              setPages(oldPages)
                              setLoadingImage2(false)
                            } catch (error) {
                              setLoadingImage2(false)
                              setErrorImage2('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                            }
                          }
                        }} value={page.image} className='m-auto w-[320px] text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                        {
                          loadingImage
                            ? (
                              <div className='flex w-full'>
                                <div className='w-fit m-auto'>
                                  <Spinner />
                                </div>
                              </div>
                            )
                            : page.bgImage !== ''
                              ? <Image src={page.bgImage!} alt={`Imagen SEO de la pagina ${page.page}`} width={500} height={500} />
                              : ''
                        }
                      </>
                    )
                    : ''
                }
              </div>
            )
          }
        })
      }
      {
        part === 'Estilo'
          ? (
            <div className='flex flex-col gap-4 p-4 mb-[104px]'>
              <div className='border-b pb-4 dark:border-neutral-700'>
                <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto'>Volver</p></button>
              </div>
              <h2 className='text-lg font-medium'>Estilo del sitio web</h2>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Tipo de diseño</p>
                <Select change={(e: any) => setStyle({ ...style, design: e.target.value })} value={style?.design}>
                  <option>Borde</option>
                  <option>Sombreado</option>
                  <option>Ninguno</option>
                </Select>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Tipo de formas</p>
                <Select change={(e: any) => setStyle({ ...style, form: e.target.value })} value={style?.form}>
                  <option>Redondeadas</option>
                  <option>Cuadradas</option>
                </Select>
              </div>
              {
                style.form === 'Redondeadas'
                  ? (
                    <>
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Esquinas botones</p>
                        <Input type='number' change={(e: any) => setStyle({ ...style, borderButton: e.target.value })} value={style.borderButton} />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Esquinas bloques</p>
                        <Input type='number' change={(e: any) => setStyle({ ...style, borderBlock: e.target.value })} value={style.borderBlock} />
                      </div>
                    </>
                  )
                  : ''
              }
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Color principal</p>
                <input type='color' onChange={(e: any) => setStyle({ ...style, primary: e.target.value })} value={style?.primary} />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Color segundario</p>
                <input type='color' onChange={(e: any) => setStyle({ ...style, secondary: e.target.value })} value={style?.secondary} />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Color texto boton</p>
                <input type='color' onChange={(e: any) => setStyle({ ...style, button: e.target.value })} value={style?.button} />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Color borde</p>
                <input type='color' onChange={(e: any) => setStyle({ ...style, borderColor: e.target.value })} value={style?.borderColor} />
              </div>
            </div>
          )
          : ''
      }
      {
        part === 'Pagina de producto'
          ? (
            <div className='flex flex-col gap-4 p-4 mb-[104px]'>
              <div className='border-b pb-4 dark:border-neutral-700'>
                <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto text-sm'>Volver</p></button>
              </div>
              <h2 className='text-lg font-medium'>Pagina de producto</h2>
              <div className='flex gap-2'>
                <input type='checkbox' checked={productPage[0].reviews} onChange={(e: any) => {
                  const beforeProductPage = [...productPage]
                  beforeProductPage[0].reviews = e.target.checked
                  setProductPage(beforeProductPage)
                }} />
                <p className='text-sm'>Activar reseñas</p>
              </div>
              <p className='font-medium text-[15px]'>Agregar zona informativa</p>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>titulo</p>
                <Input placeholder='Titulo' value={productPage[0].title} change={(e: any) => {
                  const beforeProductPage = [...productPage]
                  beforeProductPage[0].title = e.target.value
                  setProductPage(beforeProductPage)
                }} />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Descripción</p>
                <Textarea placeholder='Descripción' value={productPage[0].text} change={(e: any) => {
                  const beforeProductPage = [...productPage]
                  beforeProductPage[0].text = e.target.value
                  setProductPage(beforeProductPage)
                }} />
              </div>
            </div>
          )
          : ''
      }
      {
        part === 'Pagina de categorias'
          ? (
            <div className='flex flex-col gap-4 p-4 mb-[104px]'>
              <div className='border-b pb-4 dark:border-neutral-700'>
                <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto text-sm'>Volver</p></button>
              </div>
              <h2 className='text-lg font-medium'>Pagina de categorias</h2>
            </div>
          )
          : ''
      }
      {
        part === 'Pagina de carrito'
          ? (
            <div className='flex flex-col gap-4 p-4 mb-[104px]'>
              <div className='border-b pb-4 dark:border-neutral-700'>
                <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto text-sm'>Volver</p></button>
              </div>
              <h2 className='text-lg font-medium'>Pagina de carrito</h2>
              <div className='flex flex-col gap-2'>
                <p>Color fondo</p>
                <input type='color' value={cartPage.bgColor} onChange={(e: any) => setCartPage({ ...cartPage, bgColor: e.target.value })} />
              </div>
              <div className='flex flex-col gap-2'>
                <p>Color texto</p>
                <input type='color' value={cartPage.textColor} onChange={(e: any) => setCartPage({ ...cartPage, textColor: e.target.value })} />
              </div>
              <div className='flex flex-col gap-2'>
                <p>Color detalles</p>
                <input type='color' value={cartPage.detailsColor} onChange={(e: any) => setCartPage({ ...cartPage, detailsColor: e.target.value })} />
              </div>
            </div>
          )
          : ''
      }
      {
        part === 'Pagina de checkout'
          ? (
            <div className='flex flex-col gap-4 p-4 mb-[104px]'>
              <div className='border-b pb-4 dark:border-neutral-700'>
                <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto text-sm'>Volver</p></button>
              </div>
              <h2 className='text-lg font-medium'>Pagina de checkout</h2>
              <div className='flex flex-col gap-2'>
                <p>Color fondo</p>
                <input type='color' value={checkoutPage.bgColor} onChange={(e: any) => setCheckoutPage({ ...checkoutPage, bgColor: e.target.value })} />
              </div>
              <div className='flex flex-col gap-2'>
                <p>Color texto</p>
                <input type='color' value={checkoutPage.textColor} onChange={(e: any) => setCheckoutPage({ ...checkoutPage, textColor: e.target.value })} />
              </div>
              <div className='flex flex-col gap-2'>
                <p>Color detalles</p>
                <input type='color' value={checkoutPage.detailsColor} onChange={(e: any) => setCheckoutPage({ ...checkoutPage, detailsColor: e.target.value })} />
              </div>
            </div>
          )
          : ''
      }
      {
        part === 'Popup'
          ? (
            <div className='flex flex-col gap-4 p-4 mb-[104px]'>
              <div className='border-b pb-4 dark:border-neutral-700'>
                <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto text-sm'>Volver</p></button>
              </div>
              <h2 className='text-lg font-medium'>Popup</h2>
              <div className='flex gap-2'>
                <input type='checkbox' checked={popupWeb.active} onChange={(e: any) => setPopupWeb({ ...popupWeb, active: e.target.checked })} />
                <p className='text-sm'>Activar Popup</p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Aparecer</p>
                <div className='flex gap-2'>
                  <Input type='number' placeholder='Segundos' value={popupWeb.wait} change={(e: any) => setPopupWeb({ ...popupWeb, wait: e.target.value })} />
                  <p className='my-auto text-sm'>segundos</p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Titulo</p>
                <Input placeholder='Titulo' value={popupWeb.title} change={(e: any) => setPopupWeb({ ...popupWeb, title: e.target.value })} />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Parrafo</p>
                <Textarea placeholder='Descripción' value={popupWeb.description!} change={(e: any) => setPopupWeb({ ...popupWeb, description: e.target.value })} />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Texto boton</p>
                <Input placeholder='Boton' value={popupWeb.buttonText} change={(e: any) => setPopupWeb({ ...popupWeb, buttonText: e.target.value })} />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Link boton</p>
                <Select change={(e: any) => setPopupWeb({ ...popupWeb, buttonLink: e.target.value })} value={popupWeb.buttonLink}>
                  <option value=''>Seleccionar pagina</option>
                  {
                    pages.map(page => <option key={page._id} value={page.slug}>{page.page}</option>)
                  }
                  {
                    funnels.map(funnel => funnel.steps.filter(step => step.slug && step.slug !== '').map(step => <option key={step._id} value={step.slug}>{funnel.funnel} - {step.step}</option>))
                  }
                  {
                    services.map(service => service.steps.filter(step => step.slug && step.slug !== '').map(step => <option key={step._id} value={step.slug}>{service.name} - {step.step}</option>))
                  }
                </Select>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Mostrar formulario o llamada</p>
                <Select value={popupWeb.content} change={(e: any) => setPopupWeb({ ...popupWeb, content: e.target.value })}>
                  <option>Seleccionar formulario o llamada</option>
                  {
                    forms?.map(form => <option key={form._id} value={form._id}>{form.nameForm}</option>)
                  }
                  {
                    calls?.map(call => <option key={call._id} value={call._id}>{call.nameMeeting}</option>)
                  }
                </Select>
                <Button2 action={(e: any) => {
                  e.preventDefault()
                  setError('')
                  setTitleForm('Nuevo formulario')
                  setNewForm({ nameForm: '', informations: [{ icon: '', text: '', subText: '' }], labels: [{ text: '', name: '', data: '', type: '', datas: [] }], button: '', action: 'Ir a una pagina', tags: [], title: '' })
                  setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-1' })
                  }, 10)
                }}>Crear formulario</Button2>
                <Button2 action={(e: any) => {
                  e.preventDefault()
                  setError('')
                  setNewCall({ type: [''], nameMeeting: '', duration: '15 minutos', intervals: '', description: '', title: '', labels: [{ type: '', data: '', text: '' }], buttonText: '', action: 'Mostrar mensaje', message: '' })
                  setTitleMeeting('Crear llamada')
                  setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-1' })
                  }, 10)
                }}>Crear llamada</Button2>
              </div>
            </div>
          )
          : ''
      }
      {
        part === 'Chat'
          ? (
            <div className='flex flex-col gap-4 p-4 mb-[104px]'>
              <div className='border-b pb-4 dark:border-neutral-700'>
                <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto text-sm'>Volver</p></button>
              </div>
              <h2 className='text-lg font-medium'>Chat</h2>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Color de fondo</p>
                <input type='color' onChange={(e: any) => setChat({ ...chat, bgColor: e.target.value })} value={chat?.bgColor} />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Color del texto</p>
                <input type='color' onChange={(e: any) => setChat({ ...chat, textColor: e.target.value })} value={chat?.textColor} />
              </div>
            </div>
          )
          : ''
      }
      {
        funnels.find(funnel => funnel.funnel === part) && type === 'Funnel'
          ? (
            <div className='flex flex-col gap-4 p-4 mb-[104px]'>
              <div className='border-b pb-4 dark:border-neutral-700'>
                <button onClick={() => funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step) ? setStep('') : setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
              </div>
              <h2 className='text-lg font-medium'>{part}</h2>
              {
                funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)
                  ? (
                    <>
                      <p className='font-medium'>Paso: {step}</p>
                      <p className='font-medium'>Seo</p>
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Meta titulo</p>
                        <Input change={(e: any) => {
                          const oldFunnels = [...funnels]
                          oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.metaTitle = e.target.value
                          setFunnels(oldFunnels)
                        }} placeholder='Meta titulo' value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.metaTitle} />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Meta descripción</p>
                        <Textarea change={(e: any) => {
                          const oldFunnels = [...funnels]
                          oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.metaDescription = e.target.value
                          setFunnels(oldFunnels)
                        }} placeholder='Meta titulo' value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.metaDescription!} />
                      </div>
                      <input type='file' onChange={async (e: any) => {
                        if (!loadingImage) {
                          setLoadingImage(true)
                          setErrorImage('')
                          const formData = new FormData();
                          formData.append('image', e.target.files[0]);
                          formData.append('name', e.target.files[0].name);
                          try {
                            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                              headers: {
                                accept: 'application/json',
                                'Accept-Language': 'en-US,en;q=0.8'
                              }
                            })
                            const oldFunnels = [...funnels!]
                            oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.image = data
                            setFunnels(oldFunnels)
                            setLoadingImage(false)
                          } catch (error) {
                            setLoadingImage(false)
                            setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                          }
                        }
                      }} value={funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.image} className='m-auto w-[320px] text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                      {
                        loadingImage
                          ? (
                            <div className='flex w-full'>
                              <div className='w-fit m-auto'>
                                <Spinner />
                              </div>
                            </div>
                          )
                          : funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.image && funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.image !== ''
                            ? <Image src={funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)!.image!} alt={`Imagen SEO de la pagina ${funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.step}`} width={500} height={500} />
                            : ''
                      }
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Fondo</p>
                        <Select value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.backgroundType!} change={(e: any) => {
                          const oldFunnels = [...funnels!]
                          oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.backgroundType = e.target.value
                          if (oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.backgroundType === 'Degradado') {
                            oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.bgType = 'linear'
                            oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.bgAngle = '0'
                          }
                          setFunnels(oldFunnels)
                        }}>
                          <option>Transparente</option>
                          <option>Color</option>
                          <option>Degradado</option>
                          <option>Imagen</option>
                        </Select>
                      </div>
                      {
                        funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.backgroundType === 'Color'
                          ? (
                            <input type="color" onChange={(e: any) => {
                              const oldFunnels = [...funnels!]
                              oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.bgColor = e.target.value
                              setFunnels(oldFunnels)
                            }} value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.bgColor} />
                          )
                          : ''
                      }
                      {
                        funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.backgroundType === 'Degradado'
                          ? (
                            <div className="flex gap-2 flex-wrap">
                              <p>Color 1</p>
                              <input type="color" onChange={(e: any) => {
                                const oldFunnels = [...funnels!]
                                oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.bgColor1 = e.target.value
                                setFunnels(oldFunnels)
                              }} value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.bgColor1} />
                              <p>Color 2</p>
                              <input type="color" onChange={(e: any) => {
                                const oldFunnels = [...funnels!]
                                oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.bgColor2 = e.target.value
                                setFunnels(oldFunnels)
                              }} value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.bgColor2} />
                              <Select change={(e: any) => {
                                const oldFunnels = [...funnels!]
                                oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.bgType = e.target.value
                                setFunnels(oldFunnels)
                              }} value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.bgType}>
                                <option>Lineal</option>
                                <option>Radial</option>
                              </Select>
                              {
                                funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.bgType === 'Lineal'
                                  ? <Input change={(e: any) => {
                                    const oldFunnels = [...funnels!]
                                    oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.bgAngle = e.target.value
                                    setFunnels(oldFunnels)
                                  }} placeholder="Angulo" value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.bgAngle} />
                                  : ''
                              }
                            </div>
                          )
                          : ''
                      }
                      {
                        funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.backgroundType === 'Imagen'
                          ? (
                            <>
                              <input type='file' onChange={async (e: any) => {
                                if (!loadingImage) {
                                  setLoadingImage2(true)
                                  setErrorImage2('')
                                  const formData = new FormData();
                                  formData.append('image', e.target.files[0]);
                                  formData.append('name', e.target.files[0].name);
                                  try {
                                    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                                      headers: {
                                        accept: 'application/json',
                                        'Accept-Language': 'en-US,en;q=0.8'
                                      }
                                    })
                                    const oldFunnels = [...funnels!]
                                    oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.bgImage = data
                                    setFunnels(oldFunnels)
                                    setLoadingImage2(false)
                                  } catch (error) {
                                    setLoadingImage2(false)
                                    setErrorImage2('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                                  }
                                }
                              }} value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.image} className='m-auto w-[320px] text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                              {
                                loadingImage
                                  ? (
                                    <div className='flex w-full'>
                                      <div className='w-fit m-auto'>
                                        <Spinner />
                                      </div>
                                    </div>
                                  )
                                  : funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.bgImage && funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.bgImage !== ''
                                    ? <Image src={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.bgImage!} alt={`Imagen SEO de la pagina ${funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.step}`} width={500} height={500} />
                                    : ''
                              }
                            </>
                          )
                          : ''
                      }
                    </>
                  )
                  : (
                    <>
                      <p className='font-medium'>Pasos</p>
                      <div className='flex flex-col gap-2'>
                        {
                          funnels.find(funnel => funnel.funnel === part)?.steps.map(step => {
                            if (step.slug && step.slug !== '') {
                              return <button onClick={(e: any) => setStep(step.step)} key={step._id} className='text-left'>{step.step}</button>
                            }
                          })
                        }
                      </div>
                    </>
                  ) 
              }
              <Button2 action={(e: any) => {
                setError('')
                setNewFunnel(funnels.find(funnel => funnel.funnel === part)!)
                setTitle(funnels.find(funnel => funnel.funnel === part)!.funnel)
                setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-1' })
                }, 10)
              }}>Editar embudo</Button2>
            </div>
          )
          : ''
      }
      {
        services.find(service => service.name === part) && type === 'Service'
          ? (
            <div className='flex flex-col gap-4 p-4 mb-[104px]'>
              <div className='border-b pb-4 dark:border-neutral-700'>
                <button onClick={() => services.find(service => service.name === part)!.steps.find(st => st.step === step) ? setStep('') : setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
              </div>
              <h2 className='text-lg font-medium'>{part}</h2>
              <p className='font-medium'>Pasos</p>
              {
                services.find(service => service.name === part)!.steps!.find(st => st.step === step)
                  ? (
                    <>
                      <p className='font-medium'>Paso: {step}</p>
                      <p className='font-medium'>Seo</p>
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Meta titulo</p>
                        <Input change={(e: any) => {
                          const oldServices = [...services]
                          oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.metaTitle = e.target.value
                          setServices(oldServices)
                        }} placeholder='Meta titulo' value={services.find(service => service.name === part)!.steps.find(st => st.step === step)?.metaTitle} />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Meta descripción</p>
                        <Textarea change={(e: any) => {
                          const oldServices = [...services]
                          oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.metaDescription = e.target.value
                          setServices(oldServices)
                        }} placeholder='Meta titulo' value={services.find(service => service.name === part)!.steps.find(st => st.step === step)?.metaDescription!} />
                      </div>
                      <input type='file' onChange={async (e: any) => {
                        if (!loadingImage) {
                          setLoadingImage(true)
                          setErrorImage('')
                          const formData = new FormData();
                          formData.append('image', e.target.files[0]);
                          formData.append('name', e.target.files[0].name);
                          try {
                            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                              headers: {
                                accept: 'application/json',
                                'Accept-Language': 'en-US,en;q=0.8'
                              }
                            })
                            const oldServices = [...services]
                            oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.image = data
                            setServices(oldServices)
                            setLoadingImage(false)
                          } catch (error) {
                            setLoadingImage(false)
                            setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                          }
                        }
                      }} value={services.find(service => service.name === part)!.steps.find(st => st.step === step)?.image} className='m-auto w-[320px] text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                      {
                        loadingImage
                          ? (
                            <div className='flex w-full'>
                              <div className='w-fit m-auto'>
                                <Spinner />
                              </div>
                            </div>
                          )
                          : services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.image && services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.image !== ''
                            ? <Image src={services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)!.image!} alt={`Imagen SEO de la pagina ${services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.step}`} width={500} height={500} />
                            : ''
                      }
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Fondo</p>
                        <Select value={services.find(service => service.name === part)!.steps.find(st => st.step === step)?.backgroundType!} change={(e: any) => {
                          const oldServices = [...services]
                          oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.backgroundType = e.target.value
                          if (oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.backgroundType === 'Degradado') {
                            oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.bgType = 'linear'
                            oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.bgAngle = '0'
                          }
                          setServices(oldServices)
                        }}>
                          <option>Transparente</option>
                          <option>Color</option>
                          <option>Degradado</option>
                          <option>Imagen</option>
                        </Select>
                      </div>
                      {
                        services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.backgroundType === 'Color'
                          ? (
                            <input type="color" onChange={(e: any) => {
                              const oldServices = [...services]
                              oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.bgColor = e.target.value
                              setServices(oldServices)
                            }} value={services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.bgColor} />
                          )
                          : ''
                      }
                      {
                        services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.backgroundType === 'Degradado'
                          ? (
                            <div className="flex gap-2 flex-wrap">
                              <p>Color 1</p>
                              <input type="color" onChange={(e: any) => {
                                const oldServices = [...services]
                                oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.bgColor1 = e.target.value
                                setServices(oldServices)
                              }} value={services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.bgColor1} />
                              <p>Color 2</p>
                              <input type="color" onChange={(e: any) => {
                                const oldServices = [...services]
                                oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.bgColor2 = e.target.value
                                setServices(oldServices)
                              }} value={services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.bgColor2} />
                              <Select change={(e: any) => {
                                const oldServices = [...services]
                                oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.bgType = e.target.value
                                setServices(oldServices)
                              }} value={services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.bgType}>
                                <option>Lineal</option>
                                <option>Radial</option>
                              </Select>
                              {
                                services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.bgType === 'Lineal'
                                  ? <Input change={(e: any) => {
                                    const oldServices = [...services]
                                    oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.bgAngle = e.target.value
                                    setServices(oldServices)
                                  }} placeholder="Angulo" value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.bgAngle} />
                                  : ''
                              }
                            </div>
                          )
                          : ''
                      }
                      {
                        services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.backgroundType === 'Imagen'
                          ? (
                            <>
                              <input type='file' onChange={async (e: any) => {
                                if (!loadingImage) {
                                  setLoadingImage2(true)
                                  setErrorImage2('')
                                  const formData = new FormData();
                                  formData.append('image', e.target.files[0]);
                                  formData.append('name', e.target.files[0].name);
                                  try {
                                    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                                      headers: {
                                        accept: 'application/json',
                                        'Accept-Language': 'en-US,en;q=0.8'
                                      }
                                    })
                                    const oldServices = [...services]
                                    oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.bgImage = data
                                    setServices(oldServices)
                                    setLoadingImage2(false)
                                  } catch (error) {
                                    setLoadingImage2(false)
                                    setErrorImage2('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                                  }
                                }
                              }} value={services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.image} className='m-auto w-[320px] text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                              {
                                loadingImage
                                  ? (
                                    <div className='flex w-full'>
                                      <div className='w-fit m-auto'>
                                        <Spinner />
                                      </div>
                                    </div>
                                  )
                                  : services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.image && services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.image !== ''
                                    ? <Image src={services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.image!} alt={`Imagen SEO de la pagina ${services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.step}`} width={500} height={500} />
                                    : ''
                              }
                            </>
                          )
                          : ''
                      }
                    </>
                  )
                  : selectService?.steps.map(step => {
                    if (step.slug && step.slug !== '') {
                      return <button onClick={(e: any) => setStep(step.step)} key={step._id} className='text-left'>{step.step}</button>
                    }
                  })
              }
              <Button2 action={(e: any) => {
                setError('')
                setNewService(services.find(service => service.name === part)!)
                setTitle(services.find(service => service.name === part)!.name)
                setPopupService({ ...popupService, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopupService({ ...popupService, view: 'flex', opacity: 'opacity-1' })
                }, 10)
              }}>Editar servicio</Button2>
            </div>
          )
          : ''
      }
      {
        pages.map((page, i) => {
          if (part === page.page && type === 'Page') {
            return (
              <div key={page._id} className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                <ButtonSubmit action={async () => {
                  if (!loading) {
                    setLoading(true)
                    console.log(page)
                    if (id) {
                      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/page/${id}`, page)
                      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { color: color, header: header, footer: footer })
                    }
                    setLoading(false)
                  }
                }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                <button className='text-sm'>Cancelar</button>
              </div>
            )
          }
        })
      }
      {
        part === 'Pagina de producto' || part === 'Pagina de categorias' || part === 'Pagina de carrito' || part === 'Pagina de checkout'
          ? (
            <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
              <ButtonSubmit action={async () => {
                if (!loading) {
                  setLoading(true)
                  if (id) {
                    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { color: color, header: header, footer: footer, productPage: productPage, categoryPage: categoryPage, cartPage: cartPage, checkoutPage: checkoutPage })
                  }
                  setLoading(false)
                }
              }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
              <button className='text-sm'>Cancelar</button>
            </div>
          )
          : ''
      }
      {
        part === 'Popup'
          ? (
            <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
              <ButtonSubmit action={async () => {
                if (!loading) {
                  setLoading(true)
                  if (id) {
                    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { color: color, popup: popupWeb })
                  }
                  setLoading(false)
                }
              }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
              <button className='text-sm'>Cancelar</button>
            </div>
          )
          : ''
      }
      {
        type === 'Funnel' && funnels.find(funnel => funnel.funnel === part) && funnels.find(funnel => funnel.funnel === part)?.steps.map(st => {
          if (step === st.step) {
            return (
              <div key={st._id} className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                <ButtonSubmit action={async () => {
                  if (!loading) {
                    setLoading(true)
                    if (funnels.find(funnel => funnel.funnel === part)?._id) {
                      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/funnel-step/${funnels.find(funnel => funnel.funnel === part)?._id}`, st)
                      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { footer: footer })
                    }
                    setLoading(false)
                  }
                }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                <button className='text-sm'>Cancelar</button>
              </div>
            )
          }
        })
      }
      {
        type === 'Service' && services.find(service => service.name === part) && services.find(service => service.name === part)?.steps.map(st => {
          if (step === st.step) {
            return (
              <div key={st._id} className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                <ButtonSubmit action={async () => {
                  if (!loading) {
                    setLoading(true)
                    if (services.find(service => service.name === part)?._id) {
                      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/service-step/${services.find(service => service.name === part)?._id}`, st)
                      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { footer: footer })
                    }
                    setLoading(false)
                  }
                }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                <button className='text-sm'>Cancelar</button>
              </div>
            )
          }
        })
      }
      {
        part === 'Estilo'
          ? (
            <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
              <ButtonSubmit action={async () => {
                if (!loading) {
                  setLoading(true)
                  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/style`, style, {
                    headers: {
                      'x-tenant-id': session?.tenantId
                    }
                  })
                  setLoading(false)
                }
              }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
              <button className='text-sm'>Cancelar</button>
            </div>
          )
          : ''
      }
      {
        part === 'Chat'
          ? (
            <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
              <ButtonSubmit action={async () => {
                if (!loading) {
                  setLoading(true)
                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { chat: chat })
                  setLoading(false)
                }
              }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
              <button className='text-sm'>Cancelar</button>
            </div>
          )
          : ''
      }
    </div>
  )
}
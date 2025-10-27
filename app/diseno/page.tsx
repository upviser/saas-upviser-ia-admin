"use client"
import { Design, ICall, ICategory, ICategoryPage, IFooter, IForm, IFunnel, IHeader, IPage, IPopupWeb, IProduct, IProductPage, IService, IStoreData } from '@/interfaces'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { PopupNewCall, PopupNewForm, PopupNewPage, PopupPagesBlocks, PopupDeleteFunnel, PopupDeletePage, Bloque7, PopupDeleteService } from '@/components/design'
import { Button, Input, Select } from '@/components/ui'
import { PopupNewFunnel } from '@/components/funnels'
import { PopupNewService } from '@/components/service'
import { SlMenu } from 'react-icons/sl'
import { GrClose } from 'react-icons/gr'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import styles from  "./Slider.module.css"
import { Pagination } from "swiper/modules"
import { Page2, ServicesDesign, ProductDesign, CategoryDesign, FunnelDesign, MenuDesign, MenuDesignPhone } from '@/components/design2'

export default function Page () {

  const [part, setPart] = useState('')
  const [step, setStep] = useState('')
  const [pages, setPages] = useState<IPage[]>([
    {
      page: 'Inicio',
      slug: '',
      header: true,
      design: [
        { content: 'Carrusel', info: { banner: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' }] } },
        { content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } }
      ]
    },
    {
      page: 'Contacto',
      slug: 'contacto',
      header: true,
      design: [
        { content: 'Contacto', info: { title: 'Contacto', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempora ipsam nesciunt impedit explicabo, alias similique illum neque voluptas nemo eos distinctio vero. Veritatis iste et porro inventore tempore commodi?', titleForm: 'Llena el siguiente formulario' } },
        { content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } }
      ]
    }
  ])
  const [header, setHeader] = useState<IHeader>({ topStrip: 'Lorem ipsum dolor sit amet consectetur' })
  const [footer, setFooter] = useState<IFooter>({ bgColor: '#ffffff', textColor: '#111111', funnelText: '' })
  const [popupWeb, setPopupWeb] = useState<IPopupWeb>({ active: false, wait: 5, title: '', description: '' })
  const [color, setColor] = useState('#000000')
  const [loading, setLoading] = useState(false)
  const [storeData, setStoreData] = useState<IStoreData>()
  const [tags, setTags] = useState([])
  const [mouse, setMouse] = useState(-1)
  const [order, setOrder] = useState('Más recientes')
  const [edit, setEdit] = useState('')
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popupPage, setPopupPage] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [newPage, setNewPage] = useState({ page: '', slug: '', header: false, design: [] })
  const [indexPage, setIndexPage] = useState(-1)
  const [indexFunnel, setIndexFunnel] = useState(-1)
  const [indexStep, setIndexStep] = useState(-1)
  const [selectFunnel, setSelectFunnel] = useState<IFunnel>()
  const [funnels, setFunnels] = useState<IFunnel[]>([])
  const [newFunnel, setNewFunnel] = useState<IFunnel>({ funnel: '', steps: [{ step: '', slug: '' }] })
  const [title, setTitle] = useState('')
  const [popupNewFunnel, setPopupNewFunnel] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [forms, setForms] = useState<IForm[]>()
  const [popupForm, setPopupForm] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [titleForm, setTitleForm] = useState('')
  const [newForm, setNewForm] = useState<IForm>({ nameForm: '', informations: [{ icon: '', text: '' }], labels: [{ data: '', name: '', text: '', type: '', datas: [] }], button: '', action: 'Ir a una pagina', tags: [] })
  const [calls, setCalls] = useState<ICall[]>()
  const [newCall, setNewCall] = useState<ICall>({ nameMeeting: '', duration: '15 minutos', labels: [{ type: '', data: '', text: '' }], buttonText: '', tags: [], action: 'Mostrar mensaje' })
  const [popupCall, setPopupCall] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [titleMeeting, setTitleMeeting] = useState('')
  const [popupDeletePage, setPopupDeletePage] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popupDeleteFunnel, setPopupDeleteFunnel] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popupDeleteService, setPopupDeleteService] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [selectPage, setSelectPage] = useState<IPage>()
  const [responsive, setResponsive] = useState('calc(100%-350px)')
  const [id, setId] = useState<string>()
  const [error, setError] = useState('')
  const [newData, setNewData] = useState('')
  const [loadingNewData, setLoadingNewData] = useState(false)
  const [clientData, setClientData] = useState([])
  const [services, setServices] = useState<IService[]>([])
  const [popupService, setPopupService] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [newFunctionality, setNewFunctionality] = useState('')
  const [newService, setNewService] = useState<IService>({ name: '', steps: [{ step: '' }], typeService: '', typePrice: '', typePay: 'El precio incluye el IVA', plans: { functionalities: [''], plans: [{ name: '', price: '', functionalities: [{ name: '', value: '' }] }] }})
  const [loadingService, setLoadingService] = useState(false)
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')
  const [loadingImage2, setLoadingImage2] = useState(false)
  const [errorImage2, setErrorImage2] = useState('')
  const [selectService, setSelectService] = useState<IService>()
  const [indexService, setIndexService] = useState(-1)
  const [indexStepService, setIndexStepService] = useState(-1)
  const [type, setType] = useState('')
  const [menu, setMenu] = useState('hidden')
  const [style, setStyle] = useState({ design: 'Borde', form: 'Redondeadas', primary: '', secondary: '', button: '#111111', borderButton: 0, borderBlock: 0, borderColor: '#000000' })
  const [whatsapp, setWhatsapp] = useState(false)
  const [editSubPage, setEditSubPage] = useState(-1)
  const [loadingSubPage, setLoadingSubPage] = useState(false)
  const [chat, setChat] = useState({ bgColor: '' })
  const [instagram, setInstagram] = useState(false)
  const [chatView, setChatView] = useState(false)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [productsOrder, setProductsOrder] = useState<IProduct[]>()
  const [productPage, setProductPage] = useState<IProductPage[]>([{ reviews: true, title: '', text: '', design: [
    { content: 'Carrusel productos', info: { title: 'Lorem ipsum', products: 'Todos' } },
    { content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } }
  ] }])
  const [categoryPage, setCategoryPage] = useState<ICategoryPage[]>([{ 
    design: [
      { content: 'Bloque 6', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', image: '' } },
      { content: 'Categorias 2', info: {} },
      { content: 'Productos', info: {} },
      { content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } }
    ] 
  }])
  const [indexProduct, setIndexProduct] = useState(-1)
  const [indexCategory, setIndexCategory] = useState(-1)
  const [cartPage, setCartPage] = useState({ bgColor: '#ffffff', textColor: '#111111', detailsColor: '#ffffff' })
  const [checkoutPage, setCheckoutPage] = useState({ bgColor: '#ffffff', textColor: '#111111', detailsColor: '#ffffff' })
  const [design, setDesign] = useState<Design>()
  const [domain, setDomain] = useState()

  const { data: session } = useSession()

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setStoreData(response.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getStoreData()
    }
  }, [session?.tenantId])

  const getDomain = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/domain`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setDomain(response.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getDomain()
    }
  }, [session?.tenantId])

  const getDesign = async () => {
    const { data }: { data: Design } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/design`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setDesign(data)
    setId(data._id)
    if (data.pages) {
      setPages(data.pages)
      setHeader(data.header)
      setFooter(data.footer)
      setWhatsapp(data.whatsapp)
      setChat(data.chat)
      setInstagram(data.instagram)
      setChatView(data.chatView)
      setCartPage(data.cartPage)
      setCheckoutPage(data.checkoutPage)
      if (data.popup) {
        setPopupWeb(data.popup)
      }
    }
  }

  useEffect(() => {
    if (session?.tenantId) {
      getDesign()
    }
  }, [session?.tenantId])

  const getFunnels = async () => {
    setLoading(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/funnels`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setFunnels(res.data)
    setLoading(false)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getFunnels()
    }
  }, [session?.tenantId])

  const getCategories = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setCategories(res.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getCategories()
    }
  }, [session?.tenantId])

  const getProducts = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setProductsOrder(res.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getProducts()
    }
  }, [session?.tenantId])

  const getForms = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/forms`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setForms(res.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getForms()
    }
  }, [session?.tenantId])

  const getCalls = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/calls`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setCalls(res.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getCalls()
    }
  }, [session?.tenantId])

  const getClientData = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-data`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setClientData(res.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getClientData()
    }
  }, [session?.tenantId])

  const getTags = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setTags(res.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getTags()
    }
  }, [session?.tenantId])

  const getServices = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setServices(res.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getServices()
    }
  }, [session?.tenantId])

  const getStyle = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/style`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setStyle(res.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getStyle()
    }
  }, [session?.tenantId])

  const getPage = () => {
    const currentUrl = window.location.href
    const url = new URL(currentUrl)
    const params = new URLSearchParams(url.search)
    const page = params.get('page')
    if (page) {
      setPart(page)
    }
  }

  useEffect(() => {
    getPage()
  }, [])

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newPages = [...pages]
    const [removedItem] = newPages.splice(fromIndex, 1)
    newPages.splice(toIndex, 0, removedItem)
    return newPages;
  }

  const handleMoveDown = async (index: number) => {
    if (index < pages.length - 1) {
      const updatedPages = moveItem(index, index + 1)
      setPages(updatedPages)
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: updatedPages }, {
        headers: {
          'x-tenant-id': session?.tenantId
        }
      })
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index > 0) {
      const updatedPages = moveItem(index, index - 1)
      setPages(updatedPages)
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: updatedPages }, {
        headers: {
          'x-tenant-id': session?.tenantId
        }
      })
    }
  }

  const moveBlock = (pageIndex: number, blockIndex: number, direction: 'up' | 'down') => {
    const updatedPages = [...pages]
    const blocks = updatedPages[pageIndex].design
    const temp = blocks[blockIndex]
    if (direction === 'up' && blockIndex > 0) {
      blocks[blockIndex] = blocks[blockIndex - 1]
      blocks[blockIndex - 1] = temp
    } else if (direction === 'down' && blockIndex < blocks.length - 1) {
      blocks[blockIndex] = blocks[blockIndex + 1]
      blocks[blockIndex + 1] = temp
    }
    setPages(updatedPages)
  }

  const moveBlockCategories = (blockIndex: number, direction: 'up' | 'down') => {
    const updatedPages = [...categoryPage]
    const blocks = updatedPages[0].design
    const temp = blocks[blockIndex]
    if (direction === 'up' && blockIndex > 0) {
      blocks[blockIndex] = blocks[blockIndex - 1]
      blocks[blockIndex - 1] = temp
    } else if (direction === 'down' && blockIndex < blocks.length - 1) {
      blocks[blockIndex] = blocks[blockIndex + 1]
      blocks[blockIndex + 1] = temp
    }
    setCategoryPage(updatedPages)
  }

  const moveBlockProduct = (blockIndex: number, direction: 'up' | 'down') => {
    const updatePages = [...productPage]
    const blocks = updatePages[0].design
    const temp = blocks[blockIndex]
    if (direction === 'up' && blockIndex > 0) {
      blocks[blockIndex] = blocks[blockIndex - 1]
      blocks[blockIndex - 1] = temp
    } else if (direction === 'down' && blockIndex < blocks.length - 1) {
      blocks[blockIndex] = blocks[blockIndex + 1]
      blocks[blockIndex + 1] = temp
    }
    setProductPage(updatePages)
  }

  const moveBlockFunnel = (funnelIndex: number, stepIndex: number, blockIndex: number, direction: 'up' | 'down') => {
    const updatedFunnels = [...funnels]
    const blocks = updatedFunnels[funnelIndex].steps[stepIndex].design
    const temp = blocks![blockIndex]
    if (direction === 'up' && blockIndex > 0) {
      blocks![blockIndex] = blocks![blockIndex - 1]
      blocks![blockIndex - 1] = temp
    } else if (direction === 'down' && blockIndex < blocks!.length - 1) {
      blocks![blockIndex] = blocks![blockIndex + 1]
      blocks![blockIndex + 1] = temp
    }
    setFunnels(updatedFunnels)
  }

  return (
    <>
      <PopupNewFunnel popup={popupNewFunnel} setPopup={setPopupNewFunnel} getFunnels={getFunnels} newFunnel={newFunnel!} setNewFunnel={setNewFunnel} selectFunnel={selectFunnel!} title={title} error={error} setError={setError} services={services} funnels={funnels} />
      <PopupNewPage popupPage={popupPage} setPopupPage={setPopupPage} setLoading={setLoading} getDesign={getDesign} loading={loading} setNewPage={setNewPage} newPage={newPage} pages={pages} header={header} error={error} setError={setError} />
      <PopupPagesBlocks popup={popup} setPopup={setPopup} pages={pages} indexPage={indexPage} indexFunnel={indexFunnel} indexStep={indexStep} indexService={indexService} indexStepService={indexStepService} setPages={setPages} funnels={funnels} setFunnels={setFunnels} services={services} setServices={setServices} pageCategory={categoryPage} pageProduct={productPage} indexCategory={indexCategory} indexProduct={indexProduct} products={productsOrder} />
      <PopupNewForm popupForm={popupForm} setPopupForm={setPopupForm} titleForm={titleForm} newForm={newForm} setNewForm={setNewForm} getForms={getForms} tags={tags} funnels={funnels} getTags={getTags} error={error} setError={setError} newData={newData} setNewData={setNewData} loadingNewData={loadingNewData} setLoadingNewData={setLoadingNewData} clientData={clientData} getClientData={getClientData} style={style} />
      <PopupNewCall popupCall={popupCall} setPopupCall={setPopupCall} titleMeeting={titleMeeting} newCall={newCall} setNewCall={setNewCall} getCalls={getCalls} tags={tags} getTags={getTags} error={error} setError={setError} funnels={funnels} newData={newData} setNewData={setNewData} loadingNewData={loadingNewData} setLoadingNewData={setLoadingNewData} clientData={clientData} getClientData={getClientData} calls={calls} storeData={storeData} />
      <PopupDeleteFunnel popupDeleteFunnel={popupDeleteFunnel} setPopupDeleteFunnel={setPopupDeleteFunnel} selectFunnel={selectFunnel!} setFunnels={setFunnels} getFunnels={getFunnels} />
      <PopupDeletePage popupDeletePage={popupDeletePage} setPopupDeletePage={setPopupDeletePage} getPages={getDesign} page={selectPage} pages={pages} header={header} color={color} popupWeb={popupWeb} />
      <PopupNewService popupService={popupService} setPopupService={setPopupService} newService={newService} setNewService={setNewService} loadingService={loadingService} setLoadingService={setLoadingService} getServices={getServices} error={error} title={title} newFunctionality={newFunctionality} setNewFunctionality={setNewFunctionality} tags={tags} getTags={getTags} services={services} setError={setError} calls={calls!} design={design} />
      <PopupDeleteService getServices={getServices} setServices={setServices} popupDeleteService={popupDeleteService} setPopupDeleteService={setPopupDeleteService} selectService={selectService} />
      <div className='flex h-full bg-white dark:bg-neutral-900'>
        <div className='p-4 fixed flex lg:hidden'>
          <button onClick={(e: any) => {
            e.preventDefault()
            if (menu === 'hidden') {
              setMenu('flex')
            } else {
              setMenu('hidden')
            }
          }} className='h-fit'>{menu === 'hidden' ? <SlMenu className='text-lg' /> : <GrClose className='text-lg' />}</button>
        </div>
        <MenuDesignPhone domain={domain} menu={menu} pages={pages} part={part} type={type} setType={setType} setMenu={setMenu} setPart={setPart} setPages={setPages} session={session} handleMoveUp={handleMoveUp} handleMoveDown={handleMoveDown} setSelectPage={setSelectPage} setPopupDeletePage={setPopupDeletePage} popupDeletePage={popupDeletePage} funnels={funnels} setSelectFunnel={setSelectFunnel} setPopupDeleteFunnel={setPopupDeleteFunnel} popupDeleteFunnel={popupDeleteFunnel} services={services} setSelectService={setSelectService} setPopupDeleteService={setPopupDeleteService} popupDeleteService={popupDeleteService} setError={setError} setPopupPage={setPopupPage} popupPage={popupPage} whatsapp={whatsapp} setWhatsapp={setWhatsapp} id={id} instagram={instagram} setInstagram={setInstagram} chatView={chatView} setChatView={setChatView} setNewFunnel={setNewFunnel} setTitle={setTitle} setPopupNewFunnel={setPopupNewFunnel} popupNewFunnel={popupNewFunnel} style={style} newPage={newPage} setNewPage={setNewPage} productsOrder={productsOrder} editSubPage={editSubPage} setEditSubPage={setEditSubPage} loadingSubPage={loadingSubPage} setLoadingSubPage={setLoadingSubPage} loadingImage={loadingImage} setLoadingImage={setLoadingImage} setErrorImage={setErrorImage} setStyle={setStyle} productPage={productPage} setProductPage={setProductPage} cartPage={cartPage} setCartPage={setCartPage} checkoutPage={checkoutPage} setCheckoutPage={setCheckoutPage} popupWeb={popupWeb} setPopupWeb={setPopupWeb} forms={forms!} calls={calls!} setTitleForm={setTitleForm} setNewForm={setNewForm} popupForm={popupForm} setPopupForm={setPopupForm} setNewCall={setNewCall} popupCall={popupCall} setPopupCall={setPopupCall} setTitleMeeting={setTitleMeeting} chat={chat} setChat={setChat} step={step} setFunnels={setFunnels} setStep={setStep} setServices={setServices} selectService={selectService!} setNewService={setNewService} popupService={popupService} setPopupService={setPopupService} loading={loading} setLoading={setLoading} color={color} header={header} footer={footer} categoryPage={categoryPage} />
        <MenuDesign domain={domain} pages={pages} part={part} type={type} setType={setType} setMenu={setMenu} setPart={setPart} setPages={setPages} session={session} handleMoveUp={handleMoveUp} handleMoveDown={handleMoveDown} setSelectPage={setSelectPage} setPopupDeletePage={setPopupDeletePage} popupDeletePage={popupDeletePage} funnels={funnels} setSelectFunnel={setSelectFunnel} setPopupDeleteFunnel={setPopupDeleteFunnel} popupDeleteFunnel={popupDeleteFunnel} services={services} setSelectService={setSelectService} setPopupDeleteService={setPopupDeleteService} popupDeleteService={popupDeleteService} setError={setError} setPopupPage={setPopupPage} popupPage={popupPage} whatsapp={whatsapp} setWhatsapp={setWhatsapp} id={id} instagram={instagram} setInstagram={setInstagram} chatView={chatView} setChatView={setChatView} setNewFunnel={setNewFunnel} setTitle={setTitle} setPopupNewFunnel={setPopupNewFunnel} popupNewFunnel={popupNewFunnel} style={style} newPage={newPage} setNewPage={setNewPage} productsOrder={productsOrder} editSubPage={editSubPage} setEditSubPage={setEditSubPage} loadingSubPage={loadingSubPage} setLoadingSubPage={setLoadingSubPage} loadingImage={loadingImage} setLoadingImage={setLoadingImage} setErrorImage={setErrorImage} setStyle={setStyle} productPage={productPage} setProductPage={setProductPage} cartPage={cartPage} setCartPage={setCartPage} checkoutPage={checkoutPage} setCheckoutPage={setCheckoutPage} popupWeb={popupWeb} setPopupWeb={setPopupWeb} forms={forms!} calls={calls!} setTitleForm={setTitleForm} setNewForm={setNewForm} popupForm={popupForm} setPopupForm={setPopupForm} setNewCall={setNewCall} popupCall={popupCall} setPopupCall={setPopupCall} setTitleMeeting={setTitleMeeting} chat={chat} setChat={setChat} step={step} setFunnels={setFunnels} setStep={setStep} setServices={setServices} selectService={selectService!} setNewService={setNewService} popupService={popupService} setPopupService={setPopupService} loading={loading} setLoading={setLoading} color={color} header={header} footer={footer} categoryPage={categoryPage} loadingImage2={loadingImage2} setLoadingImage2={setLoadingImage2} errorImage2={errorImage2} setErrorImage2={setErrorImage2} />
        {
          part === ''
            ? (
              <div className='h-full flex w-full lg:w-[calc(100%-350px)] dark:bg-neutral-900'>
                <p className='m-auto'>Selecciona una pagina para editar</p>
              </div>
            )
            : ''
        }
        {
          pages.map((page, i) => {
            if (part === page.page && type === 'Page') {
              return <Page2 key={page._id} page={page} responsive={responsive} setResponsive={setResponsive} edit={edit} setEdit={setEdit} setHeader={setHeader} header={header} setPart={setPart} pages={pages} storeData={storeData} style={style} footer={footer} setFooter={setFooter} setPages={setPages} funnels={funnels} calls={calls} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} i={i} setNewCall={setNewCall} services={services} setError={setError} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setTitleMeeting={setTitleMeeting} setPopupCall={setPopupCall} setSelectFunnel={setSelectFunnel} step={step} popupCall={popupCall} error={error} setNewForm={setNewForm} getForms={getForms} newForm={newForm} setTitle={setTitle} popupService={popupService} setNewService={setNewService} setPopupService={setPopupService} setFunnels={setFunnels} clientData={clientData} getClientData={getClientData} categories={categories} mouse={mouse} setMouse={setMouse} order={order} setOrder={setOrder} productsOrder={productsOrder} moveBlock={moveBlock} setIndexPage={setIndexPage} setIndexFunnel={setIndexFunnel} setIndexService={setIndexService} setIndexCategory={setIndexCategory} setIndexProduct={setIndexProduct} setIndexStep={setIndexStep} setIndexStepService={setIndexStepService} setPopup={setPopup} popup={popup} />
            }
          })
        }
        {
          part === 'Pagina de producto'
            ? productPage.map((page, i) => <ProductDesign key={i} i={i} edit={edit} setEdit={setEdit} setHeader={setHeader} header={header} setPart={setPart} pages={pages} storeData={storeData} responsive={responsive} footer={footer} setFooter={setFooter} style={style} calls={calls} forms={forms} setProductPage={setProductPage} setMouse={setMouse} mouse={mouse} productPage={productPage} categories={categories} page={page} order={order} setOrder={setOrder} productsOrder={productsOrder} services={services} setNewCall={setNewCall} popupForm={popupForm} setPopupForm={setPopupForm} setError={setError} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} step={step} popupCall={popupCall} setPopupCall={setPopupCall} funnels={funnels} setFunnels={setFunnels} setNewForm={setNewForm} error={error} setNewService={setNewService} setTitleMeeting={setTitleMeeting} setTitle={setTitle} popupService={popupService} getForms={getForms} newForm={newForm} setPopupService={setPopupService} clientData={clientData} getClientData={getClientData} setResponsive={setResponsive} moveBlockProduct={moveBlockProduct} setIndexCategory={setIndexCategory} setIndexFunnel={setIndexFunnel} setIndexPage={setIndexPage} setIndexProduct={setIndexProduct} setIndexService={setIndexService} setIndexStep={setIndexStep} setIndexStepService={setIndexStepService} popup={popup} setPopup={setPopup} />)
            : ''
        }
        {
          part === 'Pagina de categorias'
            ? categoryPage.map((page, i) => <CategoryDesign key={i} edit={edit} setEdit={setEdit} setHeader={setHeader} header={header} setPart={setPart} pages={pages} storeData={storeData} responsive={responsive} footer={footer} setFooter={setFooter} style={style} page={page} categoryPage={categoryPage} setCategoryPage={setCategoryPage} i={i} setMouse={setMouse} mouse={mouse} calls={calls} forms={forms} categories={categories} order={order} setOrder={setOrder} productsOrder={productsOrder} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} setNewCall={setNewCall} setPopupCall={setPopupCall} setTitleMeeting={setTitleMeeting} selectFunnel={selectFunnel} popupCall={popupCall} setSelectFunnel={setSelectFunnel} step={step} setNewForm={setNewForm} error={error} setError={setError} getForms={getForms} newForm={newForm} setPopupService={setPopupService} setNewService={setNewService} popupService={popupService} setTitle={setTitle} services={services} funnels={funnels} setFunnels={setFunnels} clientData={clientData} getClientData={getClientData} setResponsive={setResponsive} moveBlockCategories={moveBlockCategories} setIndexCategory={setIndexCategory} setIndexFunnel={setIndexFunnel} setIndexPage={setIndexPage} setIndexProduct={setIndexProduct} setIndexService={setIndexService} setIndexStep={setIndexStep} setIndexStepService={setIndexStepService} popup={popup} setPopup={setPopup} />)
            : ''
        }
        {
          part === 'Popup'
            ? (
              <div className='w-full h-full text-black bg-black/30 flex lg:w-[calc(100%-350px)] px-4'>
                <div className={`${calls?.find(call => call._id === popupWeb.content) ? 'max-w-[800px]' : 'max-w-[600px]'} w-full p-6 rounded-lg bg-white m-auto flex flex-col gap-4`}>
                  {
                    popupWeb.title && popupWeb.title !== ''
                      ? <h2 className='text-2xl font-medium'>{popupWeb.title}</h2>
                      : ''
                  }
                  {
                    popupWeb.description && popupWeb.description !== ''
                      ? <p>{popupWeb.description}</p>
                      : ''
                  }
                  {
                    popupWeb.content && popupWeb.content !== '' && forms?.find(form => form._id === popupWeb.content)
                      ? (
                        <form className="flex w-full">
                          <div className="flex flex-col gap-4 border shadow-lg rounded-lg h-fit m-auto w-full p-6 max-w-[500px]">
                            <p className="text-main text-xl font-medium text-center">{forms?.find(form => form._id === popupWeb.content)?.title}</p>
                            {
                              forms?.find(form => form._id === popupWeb.content)?.informations.map(information => (
                                <div key={information.text} className="flex gap-2">
                                  <div
                                    className="my-auto"
                                    dangerouslySetInnerHTML={{ __html: information.icon }}
                                  />
                                  <div className="flex flex-col my-auto">
                                    <p>{information.text}</p>
                                    {
                                      information.subText && information.subText !== ''
                                        ? <p className="text-gray-400">{information.subText}</p>
                                        : ''
                                    }
                                  </div>
                                </div>
                              ))
                            }
                            {
                              forms?.find(form => form._id === popupWeb.content)?.labels.map(label => (
                                <div key={label.data} className="flex flex-col gap-2">
                                  <p>{label.text !== '' ? label.text : label.name}</p>
                                  <Input placeholder={label.name} change={undefined} value={undefined} />
                                </div>
                              ))
                            }
                            <Button type='submit' config='w-full'>{forms?.find(form => form._id === popupWeb.content)?.button}</Button>
                          </div>
                        </form>
                      )
                      : ''
                  }
                  {
                    popupWeb.content && popupWeb.content !== '' && calls?.find(call => call._id === popupWeb.content)
                      ? (
                        <div className="border rounded-lg shadow-md m-auto w-full max-w-[1280px]">
                          {
                            calls?.find(call => call._id === popupWeb.content)
                              ? <h2 className={`text-center ${responsive === '400px' ? 'text-[20px]' : 'text-[24px]'} border-b p-6 text-main font-semibold`}>{calls.find(call => call._id === popupWeb.content)?.title}</h2>
                              : ''
                          }
                          <div className={`flex ${responsive === '400px' ? 'flex-col' : 'flex-row'}`}>
                            <div className={`p-6 ${responsive === '400px' ? 'w-full border-b' : 'w-5/12 border-r'} flex flex-col gap-8`}>
                              <div className="flex flex-col gap-3">
                                <p className="text-sm font-medium">CARMEN ORELLANA</p>
                                {
                                  calls?.find(call => call._id === popupWeb.content)
                                    ? (
                                      <>
                                        <p className="text-xl font-semibold">{calls.find(call => call._id === popupWeb.content)?.nameMeeting}</p>
                                        <div className="flex gap-2">
                                          <svg className="w-5 text-gray-500" data-id="details-item-icon" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M.5 5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 3.269V5l1.759 2.052" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                          <p className="text-gray-500">{calls.find(call => call._id === popupWeb.content)?.duration}</p>
                                        </div>
                                      </>
                                    )
                                    : <p>No has seleccionado una llamada</p>
                                }
                              </div>
                              {
                                calls?.find(call => call._id === popupWeb.content)
                                  ? (
                                    <div className="flex flex-col gap-3">
                                      <p className="font-medium">Descripción:</p>
                                      <div onClick={() => console.log(calls.find(call => call._id === popupWeb.content)?.description)} className="flex flex-col gap-2">
                                        {
                                          calls.find(call => call._id === popupWeb.content)?.description?.split('\n').map(text => <p key={text}>{text}</p>)
                                        }
                                      </div>
                                    </div>
                                  )
                                  : ''
                              }
                            </div>
                            <div className={`p-6 ${responsive === '400px' ? 'w-full' : 'w-7/12'}`}>
                              <div className="w-full flex flex-col gap-6 h-full">
                                <div className='flex flex-col gap-6'>
                                  <div className="flex gap-6 items-center m-auto">
                                    <button className="text-gray-600 hover:text-gray-800">&lt;</button>
                                    <h1 className="text-lg font-semibold">{new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</h1>
                                    <button className="text-gray-600 hover:text-gray-800">&gt;</button>
                                  </div>
                                  <div className="grid grid-cols-7 gap-2">
                                    <div className="text-center font-semibold text-gray-600">Dom</div>
                                    <div className="text-center font-semibold text-gray-600">Lun</div>
                                    <div className="text-center font-semibold text-gray-600">Mar</div>
                                    <div className="text-center font-semibold text-gray-600">Mié</div>
                                    <div className="text-center font-semibold text-gray-600">Jue</div>
                                    <div className="text-center font-semibold text-gray-600">Vie</div>
                                    <div className="text-center font-semibold text-gray-600">Sáb</div>
                                    {renderCalendar()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                      : ''
                  }
                  {
                    popupWeb.buttonLink && popupWeb.buttonLink !== '' && popupWeb.buttonText && popupWeb.buttonText !== ''
                      ? <Button>{popupWeb.buttonText}</Button>
                      : ''
                  }
                </div>
              </div>
            )
            : ''
        }
        {
          funnels.find(funnel => funnel.funnel === part) && type === 'Funnel'
            ? funnels.find(funnel => funnel.funnel === part)?.steps.find(st => st.step === step)
              ? (
                funnels.find((funnel) => funnel.funnel === part)?.steps.map((st, i) => {
                  if (st.step === step) {
                    return <FunnelDesign key={st._id} st={st} responsive={responsive} setResponsive={setResponsive} funnels={funnels} part={part} edit={edit} pages={pages} step={step} setPages={setPages} i={i} setFunnels={setFunnels} calls={calls} forms={forms} style={style} storeData={storeData} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} setNewCall={setNewCall} services={services} error={error} setTitleMeeting={setTitleMeeting} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} setPopupCall={setPopupCall} setError={setError} setTitle={setTitle} popupService={popupService} setPopupService={setPopupService} setNewForm={setNewForm} popupCall={popupCall} setNewService={setNewService} clientData={clientData} getClientData={getClientData} categories={categories} setMouse={setMouse} order={order} setOrder={setOrder} mouse={mouse} productsOrder={productsOrder} setEdit={setEdit} moveBlockFunnel={moveBlockFunnel} setIndexCategory={setIndexCategory} setIndexFunnel={setIndexFunnel} setIndexPage={setIndexPage} setIndexProduct={setIndexProduct} setIndexService={setIndexService} setIndexStep={setIndexStep} setIndexStepService={setIndexStepService} popup={popup} setPopup={setPopup} footer={footer} setFooter={setFooter} getForms={getForms} newForm={newForm} />
                  }
                })
              )
              : <p className='m-auto'>Seleccionar paso</p>
            : ''
        }
        {
          services.find(service => service.name === part) && type === 'Service'
            ? services.find(service => service.name === part)?.steps.find(st => st.step === step)
              ? (
                services.find(service => service.name === part)?.steps.map((st, i) => {
                  if (st.step === step) {
                    return <ServicesDesign key={st._id} style={style} pages={pages} st={st} responsive={responsive} setResponsive={setResponsive} services={services} part={part} edit={edit} setPages={setPages} step={step} i={i} funnels={funnels} setFunnels={setFunnels} calls={calls} forms={forms} setServices={setServices} popupForm={popupForm} setNewCall={setNewCall} setError={setError} setTitle={setTitle} setPopupForm={setPopupForm} setTitleForm={setTitleForm} setTitleMeeting={setTitleMeeting} getClientData={getClientData} selectFunnel={selectFunnel} storeData={storeData} setPopupCall={setPopupCall} setSelectFunnel={setSelectFunnel} popupCall={popupCall} popupService={popupService} setPopupService={setPopupService} setNewForm={setNewForm} clientData={clientData} setNewService={setNewService} getForms={getForms} newForm={newForm} categories={categories} mouse={mouse} setMouse={setMouse} order={order} setOrder={setOrder} productsOrder={productsOrder} setEdit={setEdit} moveBlockFunnel={moveBlockFunnel} setIndexCategory={setIndexCategory} setIndexFunnel={setIndexFunnel} setIndexPage={setIndexPage} setIndexProduct={setIndexProduct} setIndexService={setIndexService} setIndexStep={setIndexStep} setIndexStepService={setIndexStepService} popup={popup} setPopup={setPopup} error={error} />
                  }
                })
              )
              : <p className='m-auto'>Seleccionar paso</p>
            : ''
        }
        {
          part === 'Pagina de carrito'
            ? (
              <div className='w-full bg-white text-black lg:w-[calc(100%-350px)] overflow-y-auto'>
                <div className={`w-full p-4 flex gap-4 justify-between`} style={{ boxShadow: style?.design === 'Sombreado' ? `0px 0px 10px 0px ${style.borderColor}15` : '', borderBottom: style?.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }}>
                  <p className='text-3xl font-semibold my-auto'>LOGO</p>
                  <div className='flex gap-4 my-auto'>
                    <p className='my-auto'>Inicio</p>
                    <p className='my-auto'>Contacto</p>
                    <p className={`my-auto px-4 py-2 text-white`} style={{ backgroundColor: style?.primary, color: style?.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>Hablemos</p>
                  </div>
                </div>
                <div className='flex gap-4 p-4' style={{ backgroundColor: cartPage?.bgColor, color: cartPage?.textColor }}>
                  <div className='w-1/2 flex flex-col gap-4'>
                    <h1 className='text-3xl font-medium'>Carrito</h1>
                    <div className='flex gap-4 justify-between'>
                      <div className='flex gap-2'>
                        <Image className='w-28' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} src={productsOrder![0].images[0]} alt='Imagen producto' width={200} height={200} />
                        <p className='m-auto font-medium'>{productsOrder![0].name}</p>
                      </div>
                    </div>
                  </div>
                  <div className='w-1/2'>
                    <div className='p-6 flex flex-col gap-4' style={{ border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', backgroundColor: cartPage.detailsColor }}>
                      <h2 className='text-2xl font-medium'>Calcula los costos de envío</h2>
                      <Select change={undefined} config='bg-transparent'>
                        <option>Seleccionar Región</option>
                      </Select>
                      <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 justify-between'>
                          <p>Subtotal</p>
                          <p>$10.000</p>
                        </div>
                        <div className='flex gap-2 justify-between border-b pb-2'>
                          <p>Envío</p>
                          <p>$3.000</p>
                        </div>
                        <div className='flex gap-2 justify-between'>
                          <p>Total</p>
                          <p>$13.000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            : ''
        }
        {
          part === 'Pagina de checkout'
            ? (
              <div className='w-full bg-white text-black lg:w-[calc(100%-350px)] overflow-y-auto'>
                <div className={`w-full p-4 flex gap-4 justify-between`} style={{ boxShadow: style?.design === 'Sombreado' ? `0px 0px 10px 0px ${style.borderColor}15` : '', borderBottom: style?.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }}>
                  <p className='text-3xl font-semibold my-auto'>LOGO</p>
                  <div className='flex gap-4 my-auto'>
                    <p className='my-auto'>Inicio</p>
                    <p className='my-auto'>Contacto</p>
                    <p className={`my-auto px-4 py-2 text-white`} style={{ backgroundColor: style?.primary, color: style?.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>Hablemos</p>
                  </div>
                </div>
                <div className='flex gap-4 p-4' style={{ backgroundColor: checkoutPage?.bgColor, color: checkoutPage?.textColor }}>
                  <div className='w-1/2 flex flex-col gap-4'>
                    <h1 className='text-3xl font-medium'>Finalizar compra</h1>
                    <h2 className='text-2xl font-medium'>Información de contacto</h2>
                    <div className='flex flex-col gap-1'>
                      <p>Email</p>
                      <Input config='bg-transparent' placeholder='Email' change={undefined} />
                    </div>
                    <h2 className='text-2xl font-medium'>Información de envío</h2>
                    <div className='flex gap-2'>
                      <div className='flex flex-col gap-1 w-1/2'>
                        <p>Nombre</p>
                        <Input config='bg-transparent' placeholder='Nombre' change={undefined} />
                      </div>
                      <div className='flex flex-col gap-1 w-1/2'>
                        <p>Apellido</p>
                        <Input config='bg-transparent' placeholder='Apellido' change={undefined} />
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p>Dirección</p>
                      <Input config='bg-transparent' placeholder='Dirección' change={undefined} />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p>Detalles (opcional)</p>
                      <Input config='bg-transparent' placeholder='Detalles' change={undefined} />
                    </div>
                  </div>
                  <div className='w-1/2'>
                    <div className='p-6 flex flex-col gap-4' style={{ border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', backgroundColor: checkoutPage.detailsColor }}>
                      <h2 className='text-2xl font-medium'>Carrito</h2>
                      <div className='flex gap-2 justify-between'>
                        <div className='flex gap-2'>
                          <Image className='w-20' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} src={productsOrder![0].images[0]} alt='Imagen producto' width={200} height={200} />
                          <p className='m-auto font-medium'>{productsOrder![0].name}</p>
                        </div>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 justify-between'>
                          <p>Subtotal</p>
                          <p>$10.000</p>
                        </div>
                        <div className='flex gap-2 justify-between border-b pb-2'>
                          <p>Envío</p>
                          <p>$3.000</p>
                        </div>
                        <div className='flex gap-2 justify-between'>
                          <p>Total</p>
                          <p>$13.000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            : ''
        }
        {
          part === 'Estilo'
            ? (
              <div className='w-full bg-white text-black lg:w-[calc(100%-350px)] overflow-y-auto'>
                <div className={`w-full p-4 flex gap-4 justify-between`} style={{ boxShadow: style?.design === 'Sombreado' ? `0px 0px 10px 0px ${style.borderColor}15` : '', borderBottom: style?.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }}>
                  <p className='text-3xl font-semibold my-auto'>LOGO</p>
                  <div className='flex gap-4 my-auto'>
                    <p className='my-auto'>Inicio</p>
                    <p className='my-auto'>Contacto</p>
                    <p className={`my-auto px-4 py-2 text-white`} style={{ backgroundColor: style?.primary, color: style?.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>Hablemos</p>
                  </div>
                </div>
                <div className='w-full flex flex-col gap-4 px-4 py-12'>
                  <p className='text-center m-auto text-4xl font-semibold'>Lorem ipsum</p>
                  <p className='text-center m-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti voluptatem dolorum deleniti doloremque nulla? Dolore, error assumenda. Repellendus similique natus ut accusamus ipsa voluptatem nostrum, eos, quidem sed, non reiciendis.</p>
                  <div className='flex gap-4 justify-around flex-wrap'>
                    <div className={`p-6 w-96 flex flex-col gap-3`} style={{ boxShadow: style?.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style?.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }}>
                      <p className='text-center m-auto font-medium text-2xl'>Lorem ipsum</p>
                      <p className='text-center m-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      <button className={` m-auto px-4 py-2 text-white w-full`} style={{ backgroundColor: style?.primary, color: style?.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>Lorem ipsum</button>
                    </div>
                    <div className={`p-6 w-96 flex flex-col gap-3`} style={{ boxShadow: style?.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style?.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }}>
                      <p className='text-center m-auto font-medium text-2xl'>Lorem ipsum</p>
                      <p className='text-center m-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      <button className={` m-auto px-4 py-2 text-white w-full`} style={{ backgroundColor: style?.primary, color: style?.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>Lorem ipsum</button>
                    </div>
                    <div className={`p-6 w-96 flex flex-col gap-3`} style={{ boxShadow: style?.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style?.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }}>
                      <p className='text-center m-auto font-medium text-2xl'>Lorem ipsum</p>
                      <p className='text-center m-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      <button className={` m-auto px-4 py-2 text-white w-full`} style={{ backgroundColor: style?.primary, color: style?.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>Lorem ipsum</button>
                    </div>
                  </div>
                </div>
                <div className='w-full px-4 py-12 flex flex-col gap-4'>
                  <p className='text-2xl font-medium text-center m-auto'>Lorem ipsum dolor sit amet</p>
                  <div className='flex gap-2'>
                    <input className={`w-full border px-2 bg-white`} style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} placeholder='Email' />
                    <button className={` m-auto px-4 py-2 text-white`} style={{ backgroundColor: style?.primary, color: style?.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>Envíar</button>
                  </div>
                </div>
              </div>
            )
            : ''
        }
        {
          part === 'Chat'
            ? (
              <div className={`m-auto flex h-[480px] justify-between flex-col gap-3 transition-all duration-500 bg-white w-96 sm:h-[600px] sm:gap-4`} style={{ borderRadius: `${style.borderBlock}px`, border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', boxShadow: style.design === 'Sobreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', backgroundColor: chat?.bgColor ? chat?.bgColor : '' }}>
                <div className='h-28 w-full flex p-4' style={{ backgroundColor: style.primary, borderTopLeftRadius: `${style.borderBlock}px`, borderTopRightRadius: `${style.borderBlock}px` }}>
                  <span className='text-white mt-auto mb-auto text-xl'>Chat</span>
                </div>
                <div className='flex flex-col h-full gap-2 pl-3 sm:pl-4' style={{ overflow: 'overlay' }}>
                  <div className='flex flex-col gap-2 mr-4'>
                    <div className='bg-gray-200 p-1.5 rounded-md w-fit text-black ml-auto'><p>Lorem ipsum</p></div>
                  </div>
                  <div className='flex flex-col gap-2 mr-6'>
                    <div className='text-white p-1.5 rounded-md w-fit' style={{ backgroundColor: style.primary }}><p>Lorem ipsum</p></div>
                  </div>
                </div>
                <form className='flex gap-2 pr-3 pl-3 pb-3 sm:pr-4 sm:pl-4 sm:pb-4'>
                  <input type={'text'} placeholder={'Mensaje'} style={{ backgroundColor: design?.chat?.bgColor, color: design?.chat?.textColor }} className={`w-full py-2 px-3 shadow shadow-black/5 rounded-xl transition-all duration-200 border border-[#f3f3f3] text-sm h-fit my-auto focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600 hover:border-main/80`} />
                  <Input type={'text'} placeholder={'Mensaje'} change={undefined} config='bg-white' />
                  <button type='submit' className='text-white w-28 rounded-xl dark:bg-neutral-700 transition-colors duration-200 hover:bg-transparent' style={{ backgroundColor: style.primary }}>Enviar</button>
                </form>
              </div>
            )
            : ''
        }
      </div>
    </>
  )
}

function renderCalendar(): JSX.Element[] {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const daysCount = new Date(year, month + 1, 0).getDate();
  const startingDay = new Date(year, month, 1).getDay();

  const days: JSX.Element[] = [];

  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${i}`} className="empty-day"></div>);
  }

  for (let i = 1; i <= daysCount; i++) {
    days.push(
      <button 
        key={i}  
        className={`w-12 h-12 m-auto flex rounded-full $bg-gray-100 hover:bg-main hover:text-white transition-color duration-150`}
      >
        <p className='m-auto'>{i}</p>
      </button>
    );
  }

  return days;
}
import Link from "next/link"
import { IoLaptopOutline, IoPhonePortraitOutline } from "react-icons/io5"
import { SlArrowUp, SlArrowDown } from "react-icons/sl"
import { Blocks, Bloque1, Bloque2, Bloque3, Bloque4, Bloque5, Bloque7, Call, Calls, Categories, Categories2, Checkout, Contact, Form, Lead1, Lead2, Plans, Products, Reviews, Services, Slider, SliderProducts, Subscription, Video } from "../design"
import { Button2, Button2Red, Button } from "../ui"
import Image from 'next/image'
import { IDesign, IFunnel, IPage, IService } from "@/interfaces"

interface Props {
    st: any,
    responsive: any,
    setResponsive: any,
    services: IService[],
    part: any,
    edit: any,
    setPages: any,
    step: any,
    i: any,
    funnels: IFunnel[],
    setFunnels: any,
    calls: any,
    forms: any,
    setServices: any,
    popupForm: any,
    setNewCall: any,
    setError: any,
    setTitle: any,
    setPopupForm: any,
    setTitleForm: any,
    setTitleMeeting: any,
    getClientData: any,
    selectFunnel: any,
    storeData: any,
    setPopupCall: any,
    setSelectFunnel: any,
    popupCall: any,
    popupService: any,
    setPopupService: any,
    setNewForm: any,
    clientData: any,
    setNewService: any,
    getForms: any,
    newForm: any,
    categories: any,
    mouse: any,
    setMouse: any,
    order: any,
    setOrder: any,
    productsOrder: any,
    setEdit: any,
    moveBlockFunnel: any,
    setIndexCategory: any,
    setIndexFunnel: any,
    setIndexPage: any,
    setIndexProduct: any,
    setIndexService: any,
    setIndexStep: any,
    setIndexStepService: any,
    popup: any,
    setPopup: any,
    error: any,
    pages: any
    style: any
}

export const ServicesDesign: React.FC<Props> = ({ style, pages, st, responsive, setResponsive, services, part, edit, setPages, step, i, funnels, setFunnels, calls, forms, setServices, popupForm, setNewCall, setError, setTitle, setPopupForm, setTitleForm, setTitleMeeting, getClientData, selectFunnel, storeData, setPopupCall, setSelectFunnel, popupCall, popupService, setPopupService, setNewForm, clientData, setNewService, getForms, newForm, categories, mouse, setMouse, order, setOrder, productsOrder, setEdit, moveBlockFunnel, setIndexCategory, setIndexFunnel, setIndexPage, setIndexProduct, setIndexService, setIndexStep, setIndexStepService, popup, setPopup, error }) => {
  return (
    <div key={st._id} className={`h-full m-auto bg-white text-black ${responsive === '400px' ? 'w-[400px]' : 'w-full lg:w-[calc(100%-350px)]'} lg:w-[${responsive}]`}>
      <div className='flex p-4 bg-white border-b border-border dark:bg-neutral-900 dark:border-neutral-700'>
        <div className='flex gap-4 w-fit m-auto'>
          <button onClick={(e: any) => {
            e.preventDefault()
            setResponsive('calc(100%-350px)')
          }} className='border border-border rounded-lg p-2 dark:border-neutral-700'><IoLaptopOutline className='text-2xl dark:text-white' /></button>
          <button  onClick={(e: any) => {
            e.preventDefault()
            setResponsive('400px')
          }}className='border border-border rounded-lg p-2 dark:border-neutral-700'><IoPhonePortraitOutline className='text-2xl dark:text-white' /></button>
        </div>
      </div>
      <div className='overflow-y-auto' style={{ height: 'calc(100% - 75px)' }}>
        <div className='flex flex-col gap-4' style={{ background: services.find(service => service.name === part)!.steps.find(st => st.step === step)!.backgroundType === 'Color' ? services.find(service => service.name === part)!.steps.find(st => st.step === step)!.bgColor : services.find(service => service.name === part)!.steps.find(st => st.step === step)!.backgroundType === 'Degradado' ? `${services.find(service => service.name === part)!.steps.find(st => st.step === step)!.bgType === 'Lineal' ? 'linear' : 'radial'}-gradient(${services.find(service => service.name === part)!.steps.find(st => st.step === step)!.bgType === 'Lineal' ? `${services.find(service => service.name === part)!.steps.find(st => st.step === step)!.bgAngle}deg` : 'circle'}, ${services.find(service => service.name === part)!.steps.find(st => st.step === step)!.bgColor1}, ${services.find(service => service.name === part)!.steps.find(st => st.step === step)!.bgColor2})` : services.find(service => service.name === part)!.steps.find(st => st.step === step)!.backgroundType === 'Imagen' ? `url("${services.find(service => service.name === part)!.steps.find(st => st.step === step)!.bgImage}")` : '', backgroundSize: 'cover' }}>
          {
            services.find(service => service.name === part)?.steps.find(st => st.step === step)?.design?.length
              ? services.find(service => service.name === part)!.steps.find(st => st.step === step)!.design!.map((design, index) => (
                <div key={index}>
                  {
                    design.content === 'Carrusel'
                      ? <Slider design={design} edit={edit} pages={pages} setPages={setPages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} style={style} />
                      : design.content === 'Bloque 1'
                        ? <Bloque1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} style={style} />
                        : design.content === 'Bloque 2'
                          ? <Bloque2 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} style={style} />
                          : design.content === 'Bloque 3'
                            ? <Bloque3 edit={edit} design={design} index={index} pages={pages} setPages={setPages} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} storeData={storeData} style={style} />
                            : design.content === 'Bloque 4'
                              ? <Bloque4 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} style={style} />
                              : design.content === 'Bloque 5'
                                ? <Bloque5 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} style={style} />
                                : design.content === 'Contacto'
                                  ? <Contact edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} services={services} setServices={setServices} style={style} />
                                  : design.content === 'Suscripción'
                                    ? <Subscription edit={edit} pages={pages} setPages={setPages} index={index} design={design} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} services={services} setServices={setServices} style={style} />
                                    : design.content === 'Lead 1'
                                      ? <Lead1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} services={services} setServices={setServices} storeData={storeData} getForms={getForms} newForm={newForm} style={style} />
                                      : design.content === 'Video'
                                        ? <Video edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} services={services} setServices={setServices} style={style} storeData={storeData} />
                                        : design.content === 'Agendar llamada'
                                          ? <Call edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} calls={calls!} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} setPopupCall={setPopupCall} popupCall={popupCall} responsive={responsive} error={error} setError={setError} services={services} setServices={setServices} storeData={storeData} style={style} />
                                          : design.content === 'Bloque 7'
                                            ? <Bloque7 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} services={services} setServices={setServices} />
                                            : design.content === 'Checkout'
                                              ? <Checkout edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} setServices={setServices} setError={setError} setTitle={setTitle} popupService={popupService} setPopupService={setPopupService} setNewService={setNewService} funnels={funnels} setFunnels={setFunnels} storeData={storeData} style={style} />
                                              : design.content === 'Llamadas'
                                                ? <Calls edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} calls={calls} funnels={funnels} setFunnels={setFunnels} services={services} setServices={setServices} style={style} />
                                                : design.content === 'Lead 2'
                                                  ? <Lead2 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} services={services} setServices={setServices} storeData={storeData} getForms={getForms} newForm={newForm} style={style} />
                                                  : design.content === 'Servicios'
                                                    ? <Services edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} calls={calls} funnels={funnels} setFunnels={setFunnels} services={services} setServices={setServices} responsive={responsive} pageNeed={pages} style={style} />
                                                    : design.content === 'Planes'
                                                      ? <Plans edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} setServices={setServices} getClientData={getClientData} clientData={clientData} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} popupCall={popupCall} setPopupCall={setPopupCall} calls={calls} style={style} />
                                                      : design.content === 'Bloques'
                                                        ? <Blocks edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} forms={forms} />
                                                        : design.content === 'Reseñas'
                                                          ? <Reviews edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                          : design.content === 'Formulario'
                                                            ? <Form edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setNewForm={setNewForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} style={style} getForms={getForms} newForm={newForm} />
                                                            : design.content === 'Categorias'
                                                              ? <Categories edit={edit} categories={categories} pages={pages} setPages={setPages} setMouse={setMouse} design={design} index={index} mouse={mouse} ind={i} indx={services.findIndex(service => service.name === part)} services={services} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                              : design.content === 'Productos'
                                                                ? <Products edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setPages} design={design} categories={categories} pages={pages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                : design.content === 'Categorias 2'
                                                                  ? <Categories2 edit={edit} categories={categories} pages={pages} setPages={setPages} setMouse={setMouse} design={design} index={index} mouse={mouse} ind={i} indx={services.findIndex(service => service.name === part)} services={services} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                  : design.content === 'Carrusel productos'
                                                                    ? <SliderProducts edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setPages} design={design} categories={categories} pages={pages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                    : ''
                  }
                  <div className='m-auto mt-2 mb-6 flex gap-4 w-fit bg-white'>
                    <p className='my-auto font-medium'>{design.content}</p>
                    {
                      edit === design.content
                        ? <Button2 action={() => setEdit('')}>Guardar</Button2>
                        : <Button2 action={() => {
                          setResponsive('calc(100%-350px)')
                          setEdit(design.content)
                        }}>Editar</Button2>
                    }
                    <Button2Red action={() => {
                      const oldServices = [...services]
                      oldServices[services.findIndex(service => service.name === part)].steps[i].design?.splice(index, 1)
                      setServices(oldServices)
                    }}>Eliminar bloque</Button2Red>
                    <button onClick={() => moveBlockFunnel(funnels.findIndex(funnel => funnel.funnel === part), i, index, 'up')}><SlArrowUp className='text-lg' /></button>
                    <button onClick={() => moveBlockFunnel(funnels.findIndex(funnel => funnel.funnel === part), i, index, 'down')}><SlArrowDown className='text-lg' /></button>
                  </div>
                </div>
              ))
              : (
                <div className='py-10 flex'>
                  <Button action={() => {
                    setIndexPage(-1)
                    setIndexFunnel(-1)
                    setIndexStep(-1)
                    setIndexService(services.findIndex(service => service.name === part))
                    setIndexStepService(i)
                    setIndexProduct(-1)
                    setIndexCategory(-1)
                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                    }, 10)
                  }} config='m-auto'>Agregar bloque de contenido</Button>
                </div>
              )
          }
          {
            services.find(service => service.name === part)?.steps.find(st => st.step === step)?.design?.length
              ? (
                <div className='py-10 flex'>
                  <Button action={() => {
                    setIndexPage(-1)
                    setIndexFunnel(-1)
                    setIndexStep(-1)
                    setIndexService(services.findIndex(service => service.name === part))
                    setIndexStepService(i)
                    setIndexProduct(-1)
                    setIndexCategory(-1)
                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                    }, 10)
                  }} config='m-auto'>Agregar bloque de contenido</Button>
                </div>
              )
              : ''
          }
        </div>
        <div className='w-full p-6 bg-neutral-800 flex flex-col'>
          {
            storeData?.logoWhite && storeData?.logoWhite !== ''
              ? <Link href='/' className='w-fit m-auto'><Image className='w-auto h-[52px] py-1' src={`${storeData.logoWhite}`} alt='Logo' width={155} height={53.72} /></Link>
              : <Link href='/' className='w-fit m-auto'><div className='h-[52px] flex'><p className='m-auto text-2xl font-medium text-white'>TIENDA</p></div></Link>
          }
          <p className='m-auto text-center text-white'>Todos los derechos reservados ©2024</p>
        </div>
      </div>
    </div>
  )
}
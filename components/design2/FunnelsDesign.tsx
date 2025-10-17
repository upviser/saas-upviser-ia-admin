import { IoLaptopOutline, IoPhonePortraitOutline } from "react-icons/io5"
import { Blocks, Bloque1, Bloque2, Bloque3, Bloque4, Bloque5, Bloque7, Call, Calls, Categories, Categories2, Checkout, Contact, Faq, Form, Lead1, Lead2, Lead3, Plans, Products, Reviews, Services, Slider, SliderProducts, Subscription, Table, Video } from "../design"
import Link from "next/link"
import { SlArrowUp, SlArrowDown } from "react-icons/sl"
import { Button2, Button2Red, Button, Input } from "../ui"
import Image from 'next/image'
import { IFunnel } from "@/interfaces"

interface Props {
    st: any,
    responsive: any,
    setResponsive: any,
    funnels: IFunnel[],
    part: any,
    edit: any,
    pages: any,
    step: any,
    setPages: any,
    i: any,
    setFunnels: any,
    calls: any,
    forms: any,
    style: any,
    storeData: any,
    popupForm: any,
    setPopupForm: any,
    setTitleForm: any,
    setNewCall: any,
    services: any,
    error: any,
    setTitleMeeting: any,
    selectFunnel: any,
    setSelectFunnel: any,
    setPopupCall: any,
    setError: any,
    setTitle: any,
    popupService: any,
    setPopupService: any,
    setNewForm: any,
    popupCall: any,
    setNewService: any,
    clientData: any,
    getClientData: any,
    categories: any,
    setMouse: any,
    order: any,
    setOrder: any,
    mouse: any,
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
    footer: any,
    setFooter: any
    getForms: any
    newForm: any
}

export const FunnelDesign: React.FC<Props> = ({ st, responsive, setResponsive, funnels, part, edit, pages, step, setPages, i, setFunnels, calls, forms, style, storeData, popupForm, setPopupForm, setTitleForm, setNewCall, services, error, setTitleMeeting, selectFunnel, setSelectFunnel, setPopupCall, setError, setTitle, popupService, setPopupService, setNewForm, popupCall, setNewService, clientData, getClientData, categories, setMouse, order, setOrder, mouse, productsOrder, setEdit, moveBlockFunnel, setIndexCategory, setIndexFunnel, setIndexPage, setIndexProduct, setIndexService, setIndexStep, setIndexStepService, popup, setPopup, footer, setFooter, getForms, newForm }) => {
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
        <div className='flex flex-col gap-4' style={{ background: funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.backgroundType === 'Color' ? funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.bgColor : funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.backgroundType === 'Degradado' ? `${funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.bgType === 'Lineal' ? 'linear' : 'radial'}-gradient(${funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.bgType === 'Lineal' ? `${funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.bgAngle}deg` : 'circle'}, ${funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.bgColor1}, ${funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.bgColor2})` : funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.backgroundType === 'Imagen' ? `url("${funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.bgImage}")` : '', backgroundSize: 'cover' }}>
          {
            funnels.find(funnel => funnel.funnel === part)?.steps.find(st => st.step === step)?.design?.length
              ? funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.design!.map((design, index) => (
                <div key={index}>
                  {
                    design.content === 'Carrusel'
                      ? <Slider design={design} edit={edit} pages={pages} setPages={setPages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                      : design.content === 'Bloque 1'
                        ? <Bloque1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                        : design.content === 'Bloque 2'
                          ? <Bloque2 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                          : design.content === 'Bloque 3'
                            ? <Bloque3 edit={edit} design={design} index={index} pages={pages} setPages={setPages} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} style={style} storeData={storeData} />
                            : design.content === 'Bloque 4'
                              ? <Bloque4 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                              : design.content === 'Bloque 5'
                                ? <Bloque5 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                                : design.content === 'Contacto'
                                  ? <Contact edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} style={style} />
                                  : design.content === 'Suscripción'
                                    ? <Subscription edit={edit} pages={pages} setPages={setPages} index={index} design={design} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} style={style} />
                                    : design.content === 'Lead 1'
                                      ? <Lead1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} getForms={getForms} newForm={newForm} />
                                      : design.content === 'Video'
                                        ? <Video edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} style={style} storeData={storeData} />
                                        : design.content === 'Agendar llamada'
                                          ? <Call edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} calls={calls!} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} setPopupCall={setPopupCall} popupCall={popupCall} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} />
                                          : design.content === 'Bloque 7'
                                            ? <Bloque7 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} />
                                            : design.content === 'Checkout'
                                              ? <Checkout edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} setError={setError} setTitle={setTitle} popupService={popupService} setPopupService={setPopupService} setNewService={setNewService} funnels={funnels} setFunnels={setFunnels} storeData={storeData} style={style} />
                                              : design.content === 'Llamadas'
                                                ? <Calls edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} calls={calls} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                : design.content === 'Lead 2'
                                                  ? <Lead2 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} getForms={getForms} newForm={newForm} />
                                                  : design.content === 'Servicios'
                                                    ? <Services edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} calls={calls} funnels={funnels} setFunnels={setFunnels} responsive={responsive} pageNeed={pages} style={style} />
                                                    : design.content === 'Planes'
                                                      ? <Plans edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} getClientData={getClientData} clientData={clientData} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} popupCall={popupCall} setPopupCall={setPopupCall} calls={calls} />
                                                      : design.content === 'Bloques'
                                                        ? <Blocks edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} forms={forms} />
                                                        : design.content === 'Reseñas'
                                                          ? <Reviews edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                          : design.content === 'Formulario'
                                                            ? <Form edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setNewForm={setNewForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} style={style} getForms={getForms} newForm={newForm} />
                                                            : design.content === 'Lead 3'
                                                              ? <Lead3 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setNewForm={setNewForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} style={style} storeData={storeData} getForms={getForms} newForm={newForm} />
                                                              : design.content === 'Tabla comparativa'
                                                                ? <Table edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                : design.content === 'Preguntas frecuentes'
                                                                  ? <Faq edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                  : design.content === 'Categorias'
                                                                    ? <Categories edit={edit} categories={categories} pages={pages} setPages={setPages} setMouse={setMouse} design={design} index={index} mouse={mouse} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} />
                                                                    : design.content === 'Productos'
                                                                      ? <Products edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setPages} design={design} categories={categories} pages={pages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} />
                                                                      : design.content === 'Categorias 2'
                                                                        ? <Categories2 edit={edit} categories={categories} pages={pages} setPages={setPages} setMouse={setMouse} design={design} index={index} mouse={mouse} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} />
                                                                        : design.content === 'Carrusel productos'
                                                                          ? <SliderProducts edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setPages} design={design} categories={categories} pages={pages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} />
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
                      const oldFunnels = [...funnels]
                      oldFunnels[funnels.findIndex(funnel => funnel.funnel === part)].steps[i].design?.splice(index, 1)
                      setFunnels(oldFunnels)
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
                    setIndexService(-1)
                    setIndexStepService(-1)
                    setIndexFunnel(funnels.findIndex((funnel) => funnel.funnel === part))
                    setIndexStep(i)
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
            funnels.find(funnel => funnel.funnel === part)?.steps.find(st => st.step === step)?.design?.length
              ? (
                <div className='py-10 flex'>
                  <Button action={() => {
                    setIndexPage(-1)
                    setIndexService(-1)
                    setIndexStepService(-1)
                    setIndexFunnel(funnels.findIndex((funnel) => funnel.funnel === part))
                    setIndexStep(i)
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
        <div className='w-full p-6 flex flex-col gap-2' style={{ backgroundColor: footer.bgColor, color: footer.textColor }}>
          {
            storeData?.logoWhite && storeData?.logoWhite !== ''
              ? <Link href='/' className='w-fit m-auto'><Image className='w-auto h-[52px] py-1' src={`${storeData.logoWhite}`} alt='Logo' width={155} height={53.72} /></Link>
              : <Link href='/' className='w-fit m-auto'><div className='h-[52px] flex'><p className='m-auto text-2xl font-medium text-white'>TIENDA</p></div></Link>
          }
          {
            edit === 'Footer'
              ? (
                <>
                  <Input change={(e: any) => setFooter({ ...footer, funnelText: e.target.value })} config='w-fit m-auto text-black' value={footer.funnelText} placeholder='Texto' />
                  <Button2 action={() => setEdit('')} config='m-auto'>Guardar</Button2>
                </>
              )
              : (
                <>
                  {
                    footer.funnelText && footer.funnelText !== ''
                      ? <p className='text-center m-auto text-sm' style={{ color: `${footer.textColor}80` }}>{footer.funnelText}</p>
                      : ''
                  }
                  <Button2 action={() => setEdit('Footer')} config='m-auto'>Editar</Button2>
                </>
              )
          }
          <p className='m-auto text-center' style={{ color: footer.textColor }}>{storeData?.name} © 2024. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}
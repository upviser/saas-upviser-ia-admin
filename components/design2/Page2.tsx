import { IoLaptopOutline, IoPhonePortraitOutline } from "react-icons/io5"
import { Blocks, Bloque1, Bloque2, Bloque3, Bloque4, Bloque5, Bloque7, Call, Calls, Categories, Categories2, Checkout, Contact, Faq, Form, Layout, Lead1, Lead2, Lead3, Plans, Products, Reviews, Services, Slider, SliderImages, SliderProducts, Subscription, Table, Video } from "../design"
import { Button, Button2, Button2Red } from "../ui"
import { SlArrowDown, SlArrowUp } from "react-icons/sl"
import { IPage } from "@/interfaces"

interface Props {
    page: IPage,
    responsive: any,
    setResponsive: any,
    edit: any,
    setEdit: any,
    setHeader: any,
    header: any,
    setPart: any,
    pages: any,
    storeData: any,
    style: any,
    footer: any,
    setFooter: any,
    setPages: any,
    funnels: any,
    calls: any,
    forms: any,
    popupForm: any,
    setPopupForm: any,
    i: any,
    setNewCall: any,
    services: any,
    setError: any,
    setTitleForm: any,
    selectFunnel: any,
    setTitleMeeting: any,
    setPopupCall: any,
    setSelectFunnel: any,
    step: any,
    popupCall: any,
    error: any,
    setNewForm: any,
    getForms: any,
    newForm: any,
    setTitle: any,
    popupService: any,
    setNewService: any,
    setPopupService: any,
    setFunnels: any,
    clientData: any,
    getClientData: any,
    categories: any,
    mouse: any,
    setMouse: any,
    order: any,
    setOrder: any,
    productsOrder: any,
    moveBlock: any,
    setIndexPage: any,
    setIndexFunnel: any,
    setIndexService: any,
    setIndexCategory: any,
    setIndexProduct: any,
    setIndexStep: any,
    setIndexStepService: any,
    setPopup: any,
    popup: any
}

export const Page2: React.FC<Props> = ({ page, responsive, setResponsive, edit, setEdit, setHeader, header, setPart, pages, storeData, style, footer, setFooter, setPages, funnels, calls, forms, popupForm, setPopupForm, i, setNewCall, services, setError, setTitleForm, selectFunnel, setTitleMeeting, setPopupCall, setSelectFunnel, step, popupCall, error, setNewForm, getForms, newForm, setTitle, popupService, setNewService, setPopupService, setFunnels, clientData, getClientData, categories, mouse, setMouse, order, setOrder, productsOrder, moveBlock, setIndexPage, setIndexFunnel, setIndexService, setIndexCategory, setIndexProduct, setIndexStep, setIndexStepService, setPopup, popup }) => {
  return (
    <div key={page._id} className={`m-auto h-full bg-white text-black ${responsive === '400px' ? 'w-[400px]' : 'w-full lg:w-[calc(100%-350px)]'} lg:w-[${responsive}]`}>
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
                      <div className="overflow-y-auto" style={{ height: 'calc(100% - 75px)' }}>
                      <div style={{ background: page.backgroundType === 'Color' ? page.bgColor : page.backgroundType === 'Degradado' ? `${page.bgType === 'Lineal' ? 'linear' : 'radial'}-gradient(${page.bgType === 'Lineal' ? `${page.bgAngle}deg` : 'circle'}, ${page.bgColor1}, ${page.bgColor2})` : '', backgroundImage: page.backgroundType === 'Imagen' ? `url("${page.bgImage}")` : '', backgroundSize: 'cover' }}>
                        <Layout edit={edit} setEdit={setEdit} setHeader={setHeader} header={header} setPart={setPart} pages={pages} storeData={storeData} responsive={responsive} style={style} footer={footer} setFooter={setFooter}>
                          <div className='flex flex-col gap-4'>
                            {
                              page.design.length
                                ? page.design.map((design, index) => (
                                  <div key={index}>
                                    {
                                      design.content === 'Carrusel'
                                        ? <Slider design={design} edit={edit} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} funnels={funnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                                        : design.content === 'Bloque 1'
                                          ? <Bloque1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} pageNeed={pages} funnels={funnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                                          : design.content === 'Bloque 2'
                                            ? <Bloque2 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} responsive={responsive} calls={calls} forms={forms} style={style} funnels={funnels} />
                                            : design.content === 'Bloque 3'
                                              ? <Bloque3 edit={edit} design={design} index={index} pages={pages} setPages={setPages} ind={i} pageNeed={pages} funnels={funnels} responsive={responsive} calls={calls} forms={forms} style={style} storeData={storeData} />
                                              : design.content === 'Bloque 4'
                                                ? <Bloque4 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} funnels={funnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                                                : design.content === 'Bloque 5'
                                                  ? <Bloque5 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} funnels={funnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                                                  : design.content === 'Contacto'
                                                    ? <Contact edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} responsive={responsive} style={style} />
                                                    : design.content === 'Suscripción'
                                                      ? <Subscription edit={edit} pages={pages} setPages={setPages} index={index} design={design} ind={i} responsive={responsive} style={style} />
                                                      : design.content === 'Lead 1'
                                                        ? <Lead1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} getForms={getForms} newForm={newForm} />
                                                        : design.content === 'Video'
                                                          ? <Video edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} responsive={responsive} style={style} storeData={storeData} />
                                                          : design.content === 'Agendar llamada'
                                                            ? <Call edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} calls={calls!} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} setPopupCall={setPopupCall} popupCall={popupCall} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} />
                                                            : design.content === 'Bloque 7'
                                                              ? <Bloque7 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} />
                                                              : design.content === 'Checkout'
                                                                ? <Checkout edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} services={services} setError={setError} setTitle={setTitle} popupService={popupService} setPopupService={setPopupService} setNewService={setNewService} storeData={storeData} style={style} />
                                                                : design.content === 'Llamadas'
                                                                  ? <Calls edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} calls={calls} style={style} />
                                                                  : design.content === 'Lead 2'
                                                                    ? <Lead2 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} getForms={getForms} newForm={newForm} />
                                                                    : design.content === 'Servicios'
                                                                      ? <Services edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                      : design.content === 'Planes'
                                                                        ? <Plans edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} services={services} responsive={responsive} pageNeed={pages} style={style} clientData={clientData} getClientData={getClientData} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} popupCall={popupCall} setPopupCall={setPopupCall} calls={calls} />
                                                                        : design.content === 'Preguntas frecuentes'
                                                                          ? <Faq edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} services={services} responsive={responsive} pageNeed={pages} style={style} />
                                                                          : design.content === 'Bloques'
                                                                            ? <Blocks edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} responsive={responsive} pageNeed={pages} style={style} forms={forms} funnels={funnels} calls={calls} />
                                                                            : design.content === 'Reseñas'
                                                                              ? <Reviews edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} responsive={responsive} pageNeed={pages} style={style} />
                                                                              : design.content === 'Formulario'
                                                                                ? <Form edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} responsive={responsive} pageNeed={pages} forms={forms} popupForm={popupForm} setNewForm={setNewForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} style={style} getForms={getForms} newForm={newForm} />
                                                                                : design.content === 'Lead 3'
                                                                                  ? <Lead3 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} setNewForm={setNewForm} responsive={responsive} storeData={storeData} style={style} pageNeed={pages} getForms={getForms} newForm={newForm} />
                                                                                  : design.content === 'Carrusel de imagenes'
                                                                                    ? <SliderImages edit={edit} design={design} index={index} pages={pages} setPages={setPages} ind={i} pageNeed={pages} responsive={responsive} calls={calls} forms={forms} style={style} storeData={storeData} />
                                                                                    : design.content === 'Categorias'
                                                                                      ? <Categories edit={edit} categories={categories} pages={pages} setPages={setPages} setMouse={setMouse} design={design} index={index} mouse={mouse} ind={i} style={style} />
                                                                                      : design.content === 'Productos'
                                                                                        ? <Products edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setPages} design={design} categories={categories} pages={pages} index={index} ind={i} style={style} />
                                                                                        : design.content === 'Categorias 2'
                                                                                          ? <Categories2 edit={edit} categories={categories} pages={pages} setPages={setPages} setMouse={setMouse} design={design} index={index} mouse={mouse} ind={i} style={style} />
                                                                                          : design.content === 'Carrusel productos'
                                                                                            ? <SliderProducts edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setPages} design={design} categories={categories} pages={pages} index={index} ind={i} style={style} />
                                                                                            : design.content === 'Tabla comparativa'
                                                                                              ? <Table edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                                              : ''
                                    }
                                    <div className='m-auto mt-2 mb-6 flex gap-4 w-fit'>
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
                                        const oldPages = [...pages]
                                        oldPages[i].design.splice(index, 1)
                                        setPages(oldPages)
                                      }}>Eliminar bloque</Button2Red>
                                      <button onClick={() => moveBlock(i, index, 'up')}><SlArrowUp className='text-lg' /></button>
                                      <button onClick={() => moveBlock(i, index, 'down')}><SlArrowDown className='text-lg' /></button>
                                    </div>
                                  </div>
                                ))
                                : (
                                  <div className='py-10 flex'>
                                    <Button action={() => {
                                      setIndexPage(i)
                                      setIndexFunnel(-1)
                                      setIndexStep(-1)
                                      setIndexService(-1)
                                      setIndexStepService(-1)
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
                              page.design.length
                                ? (
                                  <div className='py-10 flex'>
                                    <Button action={() => {
                                      setIndexPage(i)
                                      setIndexFunnel(-1)
                                      setIndexStep(-1)
                                      setIndexService(-1)
                                      setIndexStepService(-1)
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
                        </Layout>
                      </div>
                      </div>
                    </div>
  )
}
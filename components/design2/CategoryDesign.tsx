import { SlArrowUp, SlArrowDown } from "react-icons/sl"
import { Blocks, Bloque1, Bloque2, Bloque3, Bloque4, Bloque5, Bloque7, Call, Calls, Categories, Categories2, Checkout, Contact, Faq, Form, Layout, Lead1, Lead2, Lead3, Plans, Products, Reviews, Services, Slider, SliderImages, SliderProducts, Subscription, Table, Video } from "../design"
import { Button2, Button2Red, Button } from "../ui"
import { ICategoryPage } from "@/interfaces"

interface Props {
    edit: any,
    setEdit: any,
    setHeader: any,
    header: any,
    setPart: any,
    pages: any,
    storeData: any,
    responsive: any,
    footer: any,
    setFooter: any,
    style: any,
    page: ICategoryPage,
    categoryPage: any,
    setCategoryPage: any,
    i: any,
    setMouse: any,
    mouse: any,
    calls: any,
    forms: any,
    categories: any,
    order: any,
    setOrder: any,
    productsOrder: any,
    popupForm: any,
    setPopupForm: any,
    setTitleForm: any,
    setNewCall: any,
    setPopupCall: any,
    setTitleMeeting: any,
    selectFunnel: any,
    popupCall: any,
    setSelectFunnel: any,
    step: any,
    setNewForm: any,
    error: any,
    setError: any,
    getForms: any,
    newForm: any,
    setPopupService: any,
    setNewService: any,
    popupService: any,
    setTitle: any,
    services: any,
    funnels: any,
    setFunnels: any,
    clientData: any,
    getClientData: any,
    setResponsive: any,
    moveBlockCategories: any,
    setIndexCategory: any,
    setIndexFunnel: any,
    setIndexPage: any,
    setIndexProduct: any,
    setIndexService: any,
    setIndexStep: any,
    setIndexStepService: any,
    popup: any,
    setPopup: any
}

export const CategoryDesign: React.FC<Props> = ({ edit, setEdit, setHeader, header, setPart, pages, storeData, responsive, footer, setFooter, style, page, categoryPage, setCategoryPage, i, setMouse, mouse, calls, forms, categories, order, setOrder, productsOrder, popupForm, setPopupForm, setTitleForm, setNewCall, setPopupCall, setTitleMeeting, selectFunnel, popupCall, setSelectFunnel, step, setNewForm, error, setError, getForms, newForm, setPopupService, setNewService, popupService, setTitle, services, funnels, setFunnels, clientData, getClientData, setResponsive, moveBlockCategories, setIndexCategory, setIndexFunnel, setIndexPage, setIndexProduct, setIndexService, setIndexStep, setIndexStepService, popup, setPopup }) => {
  return (
    <div key={i} className='overflow-y-auto' style={{ width: 'calc(100% - 350px', backgroundColor: page.bgColor, color: page.textColor }}>
      <Layout edit={edit} setEdit={setEdit} setHeader={setHeader} header={header} setPart={setPart} pages={pages} storeData={storeData} responsive={responsive} footer={footer} setFooter={setFooter} style={style}>
      <div className='flex flex-col gap-4'>
        {
          page.design.length
            ? page.design.map((design, index) => (
              <div key={index}>
                {
                    design.content === 'Carrusel'
                      ? <Slider design={design} edit={edit} pages={categoryPage} setPages={setCategoryPage} index={index} inxx={i} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                      : design.content === 'Categorias'
                        ? <Categories edit={edit} categories={categories} pages={categoryPage} setPages={setCategoryPage} setMouse={setMouse} design={design} index={index} mouse={mouse} inxx={i} ind={0} style={style} />
                        : design.content === 'Bloque 1'
                          ? <Bloque1 edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                          : design.content === 'Bloque 2'
                            ? <Bloque2 edit={edit} design={design} pages={categoryPage} setPages={setCategoryPage} index={index} inxx={i} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                            : design.content === 'Bloque 3'
                              ? <Bloque3 edit={edit} design={design} index={index} pages={pages} setPages={setCategoryPage} inxx={i} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                              : design.content === 'Bloque 4'
                                ? <Bloque4 edit={edit} design={design} pages={categoryPage} setPages={setCategoryPage} index={index} inxx={i} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                                : design.content === 'Bloque 5'
                                  ? <Bloque5 edit={edit} design={design} pages={categoryPage} setPages={setCategoryPage} index={index} inxx={i} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                                  : design.content === 'Productos'
                                    ? <Products edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setCategoryPage} design={design} categories={categories} pages={categoryPage} index={index} inxx={i} ind={0} style={style} />
                                    : design.content === 'Contacto'
                                      ? <Contact edit={edit} design={design} pages={categoryPage} setPages={setCategoryPage} index={index} inx={i} ind={0} responsive={responsive} style={style} />
                                      : design.content === 'Suscripción'
                                        ? <Subscription edit={edit} pages={categoryPage} setPages={setCategoryPage} index={index} design={design} inx={i} ind={0} responsive={responsive} style={style} />
                                        : design.content === 'Bloque 6'
                                          ? (
                                            <div className="w-full flex text-center" style={{ backgroundImage: `url(${design.info.image})` }}>
                                              <div className="w-full max-w-[1280px] m-auto py-28 flex flex-col gap-2">
                                                <h1 className={`text-[25px] font-medium lg:text-[32px]`}>Nombre de la categoria</h1>
                                                <p className={`text-sm lg:text-[16px]`}>Descripción de la categoria</p>
                                              </div>
                                            </div>
                                          )
                                          : design.content === 'Categorias 2'
                                            ? <Categories2 edit={edit} categories={categories} pages={categoryPage} setPages={setCategoryPage} setMouse={setMouse} design={design} index={index} mouse={mouse} inxx={i} ind={0} style={style} />
                                            : design.content === 'Carrusel productos'
                                              ? <SliderProducts edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setCategoryPage} design={design} categories={categories} pages={categoryPage} index={index} inxx={i} ind={0} style={style} />
                                              : design.content === 'Lead 1'
                                                ? <Lead1 edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} getForms={getForms} newForm={newForm} />
                                                : design.content === 'Video'
                                                  ? <Video edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} responsive={responsive} style={style} storeData={storeData} />
                                                  : design.content === 'Agendar llamada'
                                                    ? <Call edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} calls={calls!} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} setPopupCall={setPopupCall} popupCall={popupCall} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} />
                                                    : design.content === 'Bloque 7'
                                                      ? <Bloque7 edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} />
                                                      : design.content === 'Checkout'
                                                        ? <Checkout edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} services={services} setError={setError} setTitle={setTitle} popupService={popupService} setPopupService={setPopupService} setNewService={setNewService} storeData={storeData} style={style} />
                                                        : design.content === 'Llamadas'
                                                          ? <Calls edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} calls={calls} style={style} />
                                                          : design.content === 'Lead 2'
                                                            ? <Lead2 edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} getForms={getForms} newForm={newForm} />
                                                            : design.content === 'Servicios'
                                                              ? <Services edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                              : design.content === 'Planes'
                                                                ? <Plans edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} services={services} responsive={responsive} pageNeed={pages} style={style} clientData={clientData} getClientData={getClientData} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} popupCall={popupCall} setPopupCall={setPopupCall} calls={calls} />
                                                                : design.content === 'Preguntas frecuentes'
                                                                  ? <Faq edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} services={services} responsive={responsive} pageNeed={pages} style={style} />
                                                                  : design.content === 'Bloques'
                                                                    ? <Blocks edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} responsive={responsive} pageNeed={pages} style={style} forms={forms} funnels={funnels} calls={calls} />
                                                                    : design.content === 'Reseñas'
                                                                      ? <Reviews edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} responsive={responsive} pageNeed={pages} style={style} />
                                                                      : design.content === 'Formulario'
                                                                        ? <Form edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} responsive={responsive} pageNeed={pages} forms={forms} popupForm={popupForm} setNewForm={setNewForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} style={style} getForms={getForms} newForm={newForm} />
                                                                        : design.content === 'Lead 3'
                                                                          ? <Lead3 edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} setNewForm={setNewForm} responsive={responsive} storeData={storeData} style={style} pageNeed={pages} getForms={getForms} newForm={newForm} />
                                                                          : design.content === 'Carrusel de imagenes'
                                                                            ? <SliderImages edit={edit} design={design} index={index} pages={categoryPage} setPages={setCategoryPage} inxx={i} ind={0} pageNeed={pages} responsive={responsive} calls={calls} forms={forms} style={style} storeData={storeData} />
                                                                            : design.content === 'Tabla comparativa'
                                                                              ? <Table edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                              : ''
                    }
                    <div className='m-auto mt-2 mb-6 flex gap-4 w-fit'>
                      <p className='my-auto font-medium'>{design.content}</p>
                      {
                        design.content === 'Productos' || design.content === 'Bloque 6'
                          ? ''
                          : edit === design.content
                            ? <Button2 action={() => setEdit('')}>Guardar</Button2>
                            : <Button2 action={() => {
                              setResponsive('calc(100%-350px)')
                              setEdit(design.content)
                            }}>Editar</Button2>
                      }
                      {
                        design.content === 'Productos' || design.content === 'Bloque 6'
                          ? ''
                          : (
                            <Button2Red action={() => {
                              const oldCategoryPage = [...categoryPage]
                              oldCategoryPage[i].design.splice(index, 1)
                              setCategoryPage(oldCategoryPage)
                            }}>Eliminar bloque</Button2Red>
                          )
                      }
                      <button onClick={() => moveBlockCategories(index, 'up')}><SlArrowUp className='text-lg' /></button>
                      <button onClick={() => moveBlockCategories(index, 'down')}><SlArrowDown className='text-lg' /></button>
                    </div>
              </div>
            ))
            : (
              <div className='py-10 flex'>
                <Button action={() => {
                  setIndexPage(-1)
                  setIndexFunnel(-1)
                  setIndexStep(-1)
                  setIndexService(-1)
                  setIndexStepService(-1)
                  setIndexProduct(-1)
                  setIndexCategory(0)
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
                  setIndexPage(-1)
                  setIndexFunnel(-1)
                  setIndexStep(-1)
                  setIndexService(-1)
                  setIndexStepService(-1)
                  setIndexProduct(-1)
                  setIndexCategory(0)
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
  )
}
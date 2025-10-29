import { ICall, IForm } from "@/interfaces"
import { Button, Input } from "../ui"
import React from "react"

interface Props {
    calls: ICall[] | undefined,
    popupWeb: any,
    forms: IForm[] | undefined,
    responsive: any,
    renderCalendar: any
    style: any
}

export const Popup: React.FC<Props> = ({ calls, popupWeb, forms, responsive, renderCalendar, style }) => {
  return (
    <div className='w-full h-full bg-black/30 flex lg:w-[calc(100%-350px)] px-4'>
                    <div className={`${calls?.find(call => call._id === popupWeb.content) ? 'max-w-[800px]' : 'max-w-[600px]'} w-full p-6 m-auto flex flex-col gap-4`} style={{ backgroundColor: popupWeb.bgColor, color: popupWeb.textColor, borderRadius: style?.form === 'Redondeadas' ? `${style.borderBlock}px` : '' }}>
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
                              <div className="flex flex-col gap-4 h-fit m-auto w-full max-w-[500px] max-h-[500px] overflow-y-auto">
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
                            <div className="m-auto w-full max-w-[1280px]">
                              <div className={`flex ${responsive === '400px' ? 'flex-col' : 'flex-row'}`}>
                                <div className={`${responsive === '400px' ? 'w-full' : 'w-5/12'} flex flex-col gap-8`}>
                                  <div className="flex flex-col gap-3">
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
                                <div className={`${responsive === '400px' ? 'w-full' : 'w-7/12'}`}>
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
}
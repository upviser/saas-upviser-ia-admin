"use client"
import { Button, Input, Select, Spinner } from '@/components/ui'
import { MetricCard, ConversionChart, FunnelChart, SalesOverview } from '@/components/statistics'
import { IClient, IFunnel, IService } from '@/interfaces'
import { IStadistics } from '@/interfaces/stadistics'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function Page () {

  const [stadistics, setStadistics] = useState<IStadistics>()
  const [filter, setFilter] = useState({
    dateInitial: undefined,
    dateLast: undefined
  })
  const [loading, setLoading] = useState(true)
  const [funnels, setFunnels] = useState<IFunnel[]>([])
  const [selectFunnel, setSelectFunnel] = useState('')
  const [selectService, setSelectService] = useState('')
  const [services, setServices] = useState<IService[]>([])
  const [clients, setClients] = useState<IClient[]>([])

  const { data: session } = useSession()

  const getStadistics = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stadistics`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setStadistics(response.data)
    setLoading(false)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getStadistics()
    }
  }, [session?.tenantId])

  const getFunnels = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/funnels`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setFunnels(res.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getFunnels()
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

  const getClients = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients`, {
      headers: {
        'x-tenant-id': session?.tenantId
      }
    })
    setClients(res.data)
  }

  useEffect(() => {
    if (session?.tenantId) {
      getClients()
    }
  }, [session?.tenantId])

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const handleFilter = async () => {
    if (!loading) {
      setLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/stadistics`, filter, {
        headers: {
          'x-tenant-id': session?.tenantId
        }
      })
      setStadistics(response.data)
      setLoading(false)
    }
  }

  // Calcular métricas principales
  const totalRevenue = Number(stadistics?.pays.reduce((prev, curr) => prev + Number(curr.price), 0) || 0) + 
                      Number(stadistics?.sells.reduce((prev, curr) => prev + Number(curr.total), 0) || 0)
  
  const totalSales = (stadistics?.pays.length || 0) + (stadistics?.sells.length || 0)
  const totalSessions = stadistics?.sessions.length || 0
  const totalPages = stadistics?.pages.length || 0
  const totalLeads = stadistics?.leads.length || 0
  const totalMeetings = stadistics?.meetings.length || 0
  const totalCheckouts = (stadistics?.checkouts.length || 0) + (stadistics?.informations.length || 0)
  const totalAddCarts = stadistics?.addCarts.length || 0
  const totalViewContents = stadistics?.viewContents.length || 0

  // Calcular tasas de conversión
  const conversionFromPages = totalPages > 0 ? (totalSales / totalPages) * 100 : 0
  const conversionFromSessions = totalSessions > 0 ? (totalSales / totalSessions) * 100 : 0
  const conversionFromLeads = totalLeads > 0 ? (totalSales / totalLeads) * 100 : 0
  const conversionFromMeetings = totalMeetings > 0 ? (totalSales / totalMeetings) * 100 : 0
  const conversionFromCheckouts = totalCheckouts > 0 ? (totalSales / totalCheckouts) * 100 : 0

  // Datos para gráficos de conversión
  const conversionData = [
    {
      label: 'Páginas visitadas',
      value: totalPages,
      percentage: conversionFromPages,
      color: '#3B82F6'
    },
    {
      label: 'Sesiones',
      value: totalSessions,
      percentage: conversionFromSessions,
      color: '#10B981'
    },
    {
      label: 'Registros completados',
      value: totalLeads,
      percentage: conversionFromLeads,
      color: '#8B5CF6'
    },
    {
      label: 'Reuniones agendadas',
      value: totalMeetings,
      percentage: conversionFromMeetings,
      color: '#F59E0B'
    },
    {
      label: 'Checkouts',
      value: totalCheckouts,
      percentage: conversionFromCheckouts,
      color: '#EF4444'
    }
  ]

  // Datos para el embudo de conversión
  const funnelSteps = [
    {
      id: '1',
      name: 'Páginas visitadas',
      value: totalPages,
      percentage: 100
    },
    {
      id: '2', 
      name: 'Sesiones',
      value: totalSessions,
      percentage: totalPages > 0 ? (totalSessions / totalPages) * 100 : 0
    },
    {
      id: '3',
      name: 'Productos visitados',
      value: totalViewContents,
      percentage: totalSessions > 0 ? (totalViewContents / totalSessions) * 100 : 0
    },
    {
      id: '4',
      name: 'Añadidos al carrito',
      value: totalAddCarts,
      percentage: totalViewContents > 0 ? (totalAddCarts / totalViewContents) * 100 : 0
    },
    {
      id: '5',
      name: 'Checkouts',
      value: totalCheckouts,
      percentage: totalAddCarts > 0 ? (totalCheckouts / totalAddCarts) * 100 : 0
    },
    {
      id: '6',
      name: 'Ventas',
      value: totalSales,
      percentage: totalCheckouts > 0 ? (totalSales / totalCheckouts) * 100 : 0
    }
  ]

  return (
    <>
      <Head>
        <title>Estadísticas - Dashboard</title>
      </Head>
      <div className='overflow-y-auto h-full bg-gray-50 dark:bg-neutral-900'>
        <div className='p-4 lg:p-6 max-w-7xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              Estadísticas del sitio web
            </h1>
            <p className='text-gray-600 dark:text-gray-400'>
              Análisis completo de rendimiento y conversiones
            </p>
          </div>

          {/* Filtros */}
          <div className='mb-8 bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 p-6 shadow-sm'>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Filtros de Período
            </h2>
            <div className='flex gap-4 flex-col lg:flex-row'>
              <div className='flex flex-col gap-2 flex-1'>
                <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Fecha de inicio
                </label>
                <Input type='date' change={inputChange} name='dateInitial' />
              </div>
              <div className='flex flex-col gap-2 flex-1'>
                <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Fecha de fin
                </label>
                <Input type='date' change={inputChange} name='dateLast' />
              </div>
              <div className='flex items-end'>
                <Button action={handleFilter} config='w-full lg:w-auto'>
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          {loading ? (
            <div className='flex justify-center items-center h-64'>
              <div className='text-center'>
                      <Spinner />
                <p className='mt-4 text-gray-600 dark:text-gray-400'>
                  Cargando estadísticas...
                </p>
                    </div>
                  </div>
          ) : stadistics && (totalSales > 0 || totalSessions > 0 || totalPages > 0) ? (
            <div className='space-y-8'>
              {/* Métricas principales */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <MetricCard
                  title="Ingresos Totales"
                  value={`$${NumberFormat(totalRevenue)}`}
                  subtitle="Ventas completadas"
                  color="green"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                    </svg>
                  }
                />
                
                <MetricCard
                  title="Total de Ventas"
                  value={totalSales}
                  subtitle="Transacciones completadas"
                  color="blue"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  }
                />
                
                <MetricCard
                  title="Sesiones Totales"
                  value={totalSessions}
                  subtitle="Visitas únicas"
                  color="purple"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  }
                />
                
                <MetricCard
                  title="Páginas Visitadas"
                  value={totalPages}
                  subtitle="Visualizaciones totales"
                  color="orange"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  }
                />
                          </div>

              {/* Resumen de ventas */}
              <SalesOverview
                data={{
                  totalRevenue,
                  totalSales,
                  averageOrderValue: totalSales > 0 ? totalRevenue / totalSales : 0,
                  conversionRate: conversionFromSessions
                }}
              />

              {/* Gráficos de conversión */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <ConversionChart
                  title="Tasas de Conversión"
                  data={conversionData}
                  total={totalSales}
                />
                
                <FunnelChart
                  title="Embudo de Conversión"
                  steps={funnelSteps}
                  totalConversions={totalSales}
                />
                          </div>

              {/* Métricas adicionales */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <MetricCard
                  title="Registros Completados"
                  value={totalLeads}
                  subtitle="Formularios enviados"
                  color="green"
                />
                
                <MetricCard
                  title="Reuniones Agendadas"
                  value={totalMeetings}
                  subtitle="Citas programadas"
                  color="blue"
                />
                
                <MetricCard
                  title="Productos en Carrito"
                  value={totalAddCarts}
                  subtitle="Añadidos al carrito"
                  color="purple"
                />
                
                <MetricCard
                  title="Productos Visitados"
                  value={totalViewContents}
                  subtitle="Visualizaciones de productos"
                  color="orange"
                />
                          </div>

              {/* Filtros por embudo */}
              {funnels.length > 0 && (
                <div className='bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 p-6 shadow-sm'>
                  <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Análisis por Embudo
                  </h2>
                  <div className='flex gap-4 mb-6'>
                    <div className='flex-1'>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                        Seleccionar Embudo
                      </label>
                      <Select change={(e: any) => setSelectFunnel(e.target.value)} config='w-full'>
                        <option value=''>Todos los embudos</option>
                        {funnels.map(funnel => (
                          <option key={funnel._id} value={funnel._id}>
                            {funnel.funnel}
                          </option>
                        ))}
                      </Select>
                          </div>
                        </div>
                  
                  {selectFunnel && (
                    <div className='space-y-6'>
                      <FunnelChart
                        title={`Embudo: ${funnels.find(f => f._id === selectFunnel)?.funnel}`}
                        steps={funnels.find(f => f._id === selectFunnel)?.steps.map((step, index, allSteps) => ({
                          id: step._id || `step-${index}`,
                          name: step.step,
                          value: clients.filter(client => 
                                                      client.funnels?.some(funnel => 
                                                        funnel.funnel === selectFunnel && 
                              allSteps.findIndex((s: any) => s._id === funnel.step) >= index
                            )
                          ).length,
                          percentage: 0
                        })) || []}
                        totalConversions={clients.filter(client => 
                          client.funnels?.some(funnel => funnel.funnel === selectFunnel)
                        ).length}
                      />
                                              </div>
                  )}
                                        </div>
              )}

              {/* Filtros por servicio */}
              {services.length > 0 && (
                <div className='bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 p-6 shadow-sm'>
                  <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Análisis por Servicio
                  </h2>
                  <div className='flex gap-4 mb-6'>
                    <div className='flex-1'>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                        Seleccionar Servicio
                      </label>
                      <Select change={(e: any) => setSelectService(e.target.value)} config='w-full'>
                        <option value=''>Todos los servicios</option>
                        {services.map(service => (
                          <option key={service._id} value={service._id}>
                            {service.name}
                          </option>
                        ))}
                      </Select>
                                  </div>
                                </div>
                  
                  {selectService && (
                    <div className='space-y-6'>
                      <FunnelChart
                        title={`Servicio: ${services.find(s => s._id === selectService)?.name}`}
                        steps={services.find(s => s._id === selectService)?.steps.map((step, index, allSteps) => ({
                          id: step._id || `step-${index}`,
                          name: step.step,
                          value: clients.filter(client => 
                                                        client.services?.some(service => 
                                                          service.service === selectService && 
                              allSteps.findIndex((s: any) => s._id === service.step) >= index
                            )
                          ).length,
                          percentage: 0
                        })) || []}
                        totalConversions={clients.filter(client => 
                          client.services?.some(service => service.service === selectService)
                        ).length}
                      />
                                              </div>
                  )}
                                        </div>
              )}
                                      </div>
          ) : (
            <div className='text-center py-12'>
              <div className='w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center'>
                <svg className='w-8 h-8 text-gray-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                                      </div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                No hay estadísticas disponibles
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                Comienza a generar tráfico para ver tus estadísticas aquí.
              </p>
                                      </div>
          )}
          </div>
        </div>
    </>
  )
}
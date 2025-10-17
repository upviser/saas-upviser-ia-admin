import React from 'react'

interface SalesData {
  totalRevenue: number
  totalSales: number
  averageOrderValue: number
  conversionRate: number
  topProducts?: Array<{
    name: string
    sales: number
    revenue: number
  }>
}

interface SalesOverviewProps {
  data: SalesData
  period?: string
}

export default function SalesOverview({ data, period = "Último período" }: SalesOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount)
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resumen de Ventas</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{period}</p>
      </div>
      
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(data.totalRevenue)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Ingresos Totales</p>
        </div>
        
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {data.totalSales.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Ventas Totales</p>
        </div>
        
        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {formatCurrency(data.averageOrderValue)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Ticket Promedio</p>
        </div>
        
        <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {data.conversionRate.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Tasa de Conversión</p>
        </div>
      </div>
      
      {/* Top Products */}
      {data.topProducts && data.topProducts.length > 0 && (
        <div className="border-t border-gray-200 dark:border-neutral-700 pt-6">
          <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
            Productos Más Vendidos
          </h4>
          <div className="space-y-3">
            {data.topProducts.slice(0, 5).map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {index + 1}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {product.sales} ventas
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatCurrency(product.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

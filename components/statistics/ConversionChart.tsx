import React from 'react'

interface ConversionData {
  label: string
  value: number
  percentage: number
  color: string
}

interface ConversionChartProps {
  title: string
  data: ConversionData[]
  total: number
}

export default function ConversionChart({ title, data, total }: ConversionChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Conversión por etapa</p>
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.value.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {item.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ease-out`}
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Total de conversiones
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

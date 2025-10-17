import React from 'react'

interface FunnelStep {
  id: string
  name: string
  value: number
  percentage: number
}

interface FunnelChartProps {
  title: string
  steps: FunnelStep[]
  totalConversions: number
}

export default function FunnelChart({ title, steps, totalConversions }: FunnelChartProps) {
  const maxValue = Math.max(...steps.map(step => step.value))
  
  const colors = [
    'bg-blue-500',
    'bg-blue-400', 
    'bg-blue-300',
    'bg-blue-200',
    'bg-blue-100'
  ]

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Embudo de conversión</p>
      </div>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const widthPercentage = (step.value / maxValue) * 100
          const isLastStep = index === steps.length - 1
          
          return (
            <div key={step.id} className="relative">
              {/* Step Label */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {step.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {step.value.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {step.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              {/* Funnel Bar */}
              <div className="relative">
                <div 
                  className={`h-8 ${colors[index % colors.length]} rounded-lg transition-all duration-500 ease-out`}
                  style={{ width: `${widthPercentage}%` }}
                />
                
                {/* Percentage overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white mix-blend-difference">
                    {step.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              {/* Arrow to next step */}
              {!isLastStep && (
                <div className="flex justify-center mt-2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-300 dark:border-t-gray-600"></div>
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Conversión total</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {totalConversions.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Tasa de conversión</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {steps.length > 0 ? ((steps[steps.length - 1].value / steps[0].value) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

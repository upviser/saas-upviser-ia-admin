import React from 'react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
}

const colorClasses = {
  blue: 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400',
  green: 'bg-green-50 border-green-200 text-green-600 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400',
  purple: 'bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400',
  orange: 'bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400',
  red: 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
}

export default function MetricCard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  icon, 
  color = 'blue' 
}: MetricCardProps) {
  return (
    <div className={`p-6 rounded-xl border-2 ${colorClasses[color]} transition-all duration-200 hover:shadow-lg hover:scale-105`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
              {icon}
            </div>
          )}
          <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-300">{title}</h3>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{trend.isPositive ? '↗' : '↘'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

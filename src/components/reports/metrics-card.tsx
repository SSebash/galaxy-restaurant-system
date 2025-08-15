'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MetricsCardProps {
  title: string
  value: string | number
  change?: number
  changeType?: 'increase' | 'decrease' | 'neutral'
  description?: string
  icon?: React.ReactNode
  format?: 'currency' | 'number' | 'percentage'
}

export function MetricsCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  description = '', 
  icon,
  format = 'number'
}: MetricsCardProps) {
  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case 'decrease':
        return <TrendingDown className="h-4 w-4 text-red-400" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-400'
      case 'decrease':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val
    
    switch (format) {
      case 'currency':
        return `$${val.toLocaleString()}`
      case 'percentage':
        return `${val}%`
      default:
        return val.toLocaleString()
    }
  }

  // Determinar el tipo de cambio basado en el valor
  const getChangeType = () => {
    if (change === undefined) return 'neutral'
    if (change > 0) return 'increase'
    if (change < 0) return 'decrease'
    return 'neutral'
  }

  const actualChangeType = changeType === 'neutral' ? getChangeType() : changeType

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{formatValue(value)}</div>
        {description && (
          <p className="text-xs text-slate-400 mt-1">{description}</p>
        )}
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            {getChangeIcon()}
            <span className={`text-xs ${getChangeColor()}`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
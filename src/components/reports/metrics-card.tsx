"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface MetricsCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: string
    type: 'positive' | 'negative' | 'neutral'
  }
  icon?: LucideIcon
  iconColor?: string
}

export function MetricsCard({ title, value, subtitle, trend, icon: Icon, iconColor }: MetricsCardProps) {
  const getTrendColor = () => {
    switch (trend?.type) {
      case 'positive': return 'text-green-400'
      case 'negative': return 'text-red-400'
      default: return 'text-slate-400'
    }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
        {Icon && <Icon className={`h-4 w-4 ${iconColor || 'text-slate-400'}`} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value || 'N/A'}</div>
        {subtitle && (
          <p className="text-sm text-slate-400">{subtitle}</p>
        )}
        {trend && (
          <p className={`text-xs ${getTrendColor()}`}>
            {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
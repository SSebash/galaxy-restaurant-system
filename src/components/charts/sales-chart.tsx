'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface SalesChartProps {
  data: Array<{
    hour: string
    sales: number
    orders: number
  }>
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="hour" 
          stroke="#9CA3AF"
          tick={{ fill: '#9CA3AF' }}
        />
        <YAxis 
          stroke="#9CA3AF"
          tick={{ fill: '#9CA3AF' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1F2937', 
            border: '1px solid #374151',
            borderRadius: '0.5rem',
            color: '#F9FAFB'
          }}
          labelStyle={{ color: '#F9FAFB' }}
        />
        <Line 
          type="monotone" 
          dataKey="sales" 
          stroke="#8B5CF6" 
          strokeWidth={2}
          dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: '#8B5CF6' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
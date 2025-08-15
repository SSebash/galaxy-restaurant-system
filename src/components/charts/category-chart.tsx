'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface CategoryChartProps {
  data: Array<{
    name: string
    value: number
    revenue: number
    orders: number
  }>
}

const COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B']

export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1F2937', 
            border: '1px solid #374151',
            borderRadius: '0.5rem',
            color: '#F9FAFB'
          }}
          labelStyle={{ color: '#F9FAFB' }}
          formatter={(value: number, name: string, props: any) => [
            `${value}%`,
            props.payload.name
          ]}
        />
        <Legend 
          iconType="circle"
          wrapperStyle={{ color: '#9CA3AF', fontSize: '12px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
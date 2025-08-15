"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface InnovationAnalysisProps {
  data: Array<{
    innovation: string
    category: string
    developmentStage: string
    investment: number
    expectedReturn: number
    riskLevel: number
    status: 'RESEARCH' | 'DEVELOPMENT' | 'TESTING' | 'IMPLEMENTATION' | 'COMPLETED'
  }>
  title?: string
  description?: string
}

export function InnovationAnalysis({ data, title = "Análisis de Innovación", description = "Proyectos de innovación y desarrollo" }: InnovationAnalysisProps) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">{title}</CardTitle>
          <CardDescription className="text-slate-400">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center">
            <p className="text-slate-400">No hay datos disponibles</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const maxInvestment = Math.max(...data.map(d => d.investment || 0))
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-500'
      case 'IMPLEMENTATION': return 'bg-blue-500'
      case 'TESTING': return 'bg-yellow-500'
      case 'DEVELOPMENT': return 'bg-orange-500'
      case 'RESEARCH': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-slate-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">{item.innovation || 'N/A'}</span>
                  <div className="text-sm text-slate-400">{item.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    item.status === 'COMPLETED' ? 'default' :
                    item.status === 'IMPLEMENTATION' ? 'secondary' :
                    'outline'
                  }>
                    {item.status}
                  </Badge>
                  <span className="text-sm text-slate-400">
                    Riesgo: {item.riskLevel || 0}/10
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(item.status)}`}
                  style={{ width: `${maxInvestment > 0 ? ((item.investment || 0) / maxInvestment) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Inversión: ${(item.investment || 0).toLocaleString()}</span>
                <span>Retorno esperado: ${(item.expectedReturn || 0).toLocaleString()}</span>
                <span>Etapa: {item.developmentStage}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface RiskAnalysisProps {
  data: Array<{
    riskCategory: string
    riskLevel: number
    probability: number
    impact: number
    mitigation: string
    status: 'MITIGATED' | 'MONITORED' | 'ACCEPTED' | 'CRITICAL'
  }>
  title?: string
  description?: string
}

export function RiskAnalysis({ data, title = "Análisis de Riesgos", description = "Identificación y gestión de riesgos" }: RiskAnalysisProps) {
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

  const maxRisk = Math.max(...data.map(d => d.riskLevel || 0))
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'MITIGATED': return 'bg-green-500'
      case 'MONITORED': return 'bg-blue-500'
      case 'ACCEPTED': return 'bg-yellow-500'
      case 'CRITICAL': return 'bg-red-500'
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
                <span className="text-white font-medium">{item.riskCategory || 'N/A'}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    item.status === 'MITIGATED' ? 'default' :
                    item.status === 'MONITORED' ? 'secondary' :
                    item.status === 'ACCEPTED' ? 'outline' : 'destructive'
                  }>
                    {item.status}
                  </Badge>
                  <span className="text-sm text-slate-400">
                    {item.riskLevel || 0}/10
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(item.status)}`}
                  style={{ width: `${(item.riskLevel || 0) * 10}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Probabilidad: {(item.probability || 0).toFixed(1)}%</span>
                <span>Impacto: {(item.impact || 0).toFixed(1)}%</span>
                <span>Mitigación: {item.mitigation?.substring(0, 15) || 'N/A'}...</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
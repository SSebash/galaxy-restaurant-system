import { NextRequest, NextResponse } from 'next/server'

// Tipos de datos para los reportes
interface SalesData {
  hour: string
  sales: number
  orders: number
}

interface CategoryData {
  name: string
  value: number
  revenue: number
  orders: number
}

interface InventoryItem {
  name: string
  currentStock: number
  minStock: number
  unit: string
}

interface PopularItem {
  name: string
  orders: number
  revenue: number
}

interface SalesTrend {
  period: string
  sales: number
  growth: number
}

interface ProductPerformance {
  name: string
  revenue: number
  cost: number
  profit: number
  margin: number
}

interface TableUtilization {
  name: string
  capacity: number
  utilizationRate: number
  totalRevenue: number
  status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED'
}

interface KitchenEfficiency {
  period: string
  ordersCompleted: number
  averageTime: number
  efficiency: number
}

interface MenuItem {
  name: string
  category: string
  price: number
  cost: number
  popularity: number
  profitMargin: number
  classification: 'STAR' | 'PUZZLE' | 'PLOWHORSE' | 'DOG'
}

interface CustomerSatisfaction {
  category: string
  rating: number
  totalReviews: number
  positive: number
  negative: number
  neutral: number
}

interface InventoryMovement {
  productName: string
  type: 'IN' | 'OUT'
  quantity: number
  date: string
  user: string
  referenceType?: string
}

interface EmployeePerformance {
  name: string
  role: string
  ordersServed: number
  totalSales: number
  averageTicket: number
  efficiency: number
}

interface CostAnalysis {
  category: string
  totalCost: number
  budget: number
  variance: number
  variancePercentage: number
}

interface SeasonalTrend {
  month: string
  sales: number
  orders: number
  averageTicket: number
  growth: number
  season: string
}

interface PeakHour {
  hour: string
  sales: number
  orders: number
  customers: number
  isPeak: boolean
}

interface TableProfitability {
  tableName: string
  totalRevenue: number
  totalCosts: number
  profit: number
  profitMargin: number
  turnoverRate: number
}

interface SupplierAnalysis {
  name: string
  totalOrders: number
  totalAmount: number
  averageDeliveryTime: number
  qualityRating: number
  onTimeDelivery: number
}

interface PaymentMethod {
  method: string
  transactions: number
  totalAmount: number
  averageAmount: number
  percentage: number
  fees: number
}

interface WasteAnalysis {
  productName: string
  wasteAmount: number
  wasteCost: number
  wastePercentage: number
  reason: string
  date: string
}

interface InventoryTurnover {
  productName: string
  category: string
  turnoverRate: number
  daysOfSupply: number
  currentStock: number
  annualUsage: number
}

interface FrequentCustomer {
  customerName: string
  visits: number
  totalSpent: number
  averageTicket: number
  lastVisit: string
  favoriteCategory: string
}

interface PromotionAnalysis {
  promotionName: string
  type: string
  discount: number
  salesIncrease: number
  revenueGenerated: number
  cost: number
  roi: number
}

interface CompetitorAnalysis {
  competitorName: string
  distance: number
  priceLevel: number
  qualityRating: number
  marketShare: number
  strengths: string[]
  weaknesses: string[]
}

interface LaborAnalysis {
  period: string
  laborCost: number
  laborCostPercentage: number
  revenue: number
  productivity: number
  overtimeHours: number
}

interface EnergyAnalysis {
  equipment: string
  energyConsumption: number
  cost: number
  efficiency: number
  usageHours: number
  status: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'
}

interface MaintenanceAnalysis {
  equipment: string
  maintenanceCost: number
  downtime: number
  lastMaintenance: string
  nextMaintenance: string
  condition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'
}

interface RiskAnalysis {
  riskCategory: string
  riskLevel: number
  probability: number
  impact: number
  mitigation: string
  status: 'MITIGATED' | 'MONITORED' | 'ACCEPTED' | 'CRITICAL'
}

interface CapacityAnalysis {
  area: string
  currentCapacity: number
  maximumCapacity: number
  utilizationRate: number
  expansionNeeded: boolean
  estimatedCost: number
}

interface QualityAnalysis {
  category: string
  qualityScore: number
  inspections: number
  issues: number
  lastInspection: string
  trend: 'IMPROVING' | 'STABLE' | 'DECLINING'
}

interface SustainabilityAnalysis {
  initiative: string
  category: string
  implementationDate: string
  cost: number
  savings: number
  roi: number
  status: 'ACTIVE' | 'PLANNED' | 'COMPLETED' | 'CANCELLED'
}

interface InnovationAnalysis {
  innovation: string
  category: string
  developmentStage: string
  investment: number
  expectedReturn: number
  riskLevel: number
  status: 'RESEARCH' | 'DEVELOPMENT' | 'TESTING' | 'IMPLEMENTATION' | 'COMPLETED'
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const reportType = searchParams.get('type') || 'sales'
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Datos simulados para demostración
    switch (reportType) {
      case 'sales':
        const salesData: SalesData[] = [
          { hour: '12:00', sales: 340, orders: 8 },
          { hour: '13:00', sales: 380, orders: 9 },
          { hour: '14:00', sales: 280, orders: 6 },
          { hour: '19:00', sales: 360, orders: 8 },
          { hour: '20:00', sales: 300, orders: 7 },
          { hour: '21:00', sales: 250, orders: 5 },
        ]
        return NextResponse.json(salesData)

      case 'categories':
        const categoryData: CategoryData[] = [
          { name: 'Platos Principales', value: 54, revenue: 680, orders: 18 },
          { name: 'Entradas', value: 26, revenue: 320, orders: 12 },
          { name: 'Bebidas', value: 14, revenue: 180, orders: 15 },
          { name: 'Postres', value: 6, revenue: 67.50, orders: 6 },
        ]
        return NextResponse.json(categoryData)

      case 'inventory':
        const inventoryData: InventoryItem[] = [
          { name: 'Harina', currentStock: 5, minStock: 10, unit: 'kg' },
          { name: 'Lechuga', currentStock: 8, minStock: 5, unit: 'kg' },
          { name: 'Tomate', currentStock: 50, minStock: 10, unit: 'kg' },
          { name: 'Pollo', currentStock: 15, minStock: 8, unit: 'kg' },
        ]
        return NextResponse.json(inventoryData)

      case 'popular':
        const popularData: PopularItem[] = [
          { name: 'Hamburguesa Clásica', orders: 15, revenue: 225.00 },
          { name: 'Ensalada César', orders: 8, revenue: 76.00 },
          { name: 'Papas Fritas', orders: 12, revenue: 54.00 },
          { name: 'Pollo Frito', orders: 6, revenue: 78.00 },
        ]
        return NextResponse.json(popularData)

      case 'trends':
        const trendsData: SalesTrend[] = [
          { period: 'Enero', sales: 15000, growth: 5.2 },
          { period: 'Febrero', sales: 16200, growth: 8.0 },
          { period: 'Marzo', sales: 15800, growth: -2.5 },
          { period: 'Abril', sales: 17500, growth: 10.8 },
        ]
        return NextResponse.json(trendsData)

      case 'products':
        const productsData: ProductPerformance[] = [
          { name: 'Hamburguesa', revenue: 2250, cost: 900, profit: 1350, margin: 60 },
          { name: 'Ensalada', revenue: 760, cost: 380, profit: 380, margin: 50 },
          { name: 'Papas Fritas', revenue: 540, cost: 270, profit: 270, margin: 50 },
          { name: 'Pollo Frito', revenue: 780, cost: 390, profit: 390, margin: 50 },
        ]
        return NextResponse.json(productsData)

      case 'tables':
        const tablesData: TableUtilization[] = [
          { name: 'Mesa 1', capacity: 4, utilizationRate: 85, totalRevenue: 1250, status: 'OCCUPIED' },
          { name: 'Mesa 2', capacity: 2, utilizationRate: 60, totalRevenue: 680, status: 'AVAILABLE' },
          { name: 'Mesa 3', capacity: 6, utilizationRate: 95, totalRevenue: 1890, status: 'OCCUPIED' },
          { name: 'Mesa 4', capacity: 4, utilizationRate: 45, totalRevenue: 450, status: 'AVAILABLE' },
        ]
        return NextResponse.json(tablesData)

      case 'kitchen':
        const kitchenData: KitchenEfficiency[] = [
          { period: 'Mañana', ordersCompleted: 25, averageTime: 18, efficiency: 92 },
          { period: 'Tarde', ordersCompleted: 35, averageTime: 22, efficiency: 88 },
          { period: 'Noche', ordersCompleted: 45, averageTime: 25, efficiency: 85 },
        ]
        return NextResponse.json(kitchenData)

      case 'menu':
        const menuData: MenuItem[] = [
          { name: 'Hamburguesa Clásica', category: 'Platos Principales', price: 15.99, cost: 6.40, popularity: 85, profitMargin: 60, classification: 'STAR' },
          { name: 'Ensalada César', category: 'Entradas', price: 8.99, cost: 4.50, popularity: 45, profitMargin: 50, classification: 'PUZZLE' },
          { name: 'Papas Fritas', category: 'Acompañamientos', price: 4.99, cost: 2.50, popularity: 70, profitMargin: 50, classification: 'PLOWHORSE' },
          { name: 'Sopa del Día', category: 'Entradas', price: 6.99, cost: 4.20, popularity: 25, profitMargin: 40, classification: 'DOG' },
        ]
        return NextResponse.json(menuData)

      case 'satisfaction':
        const satisfactionData: CustomerSatisfaction[] = [
          { category: 'Comida', rating: 4.5, totalReviews: 120, positive: 95, negative: 15, neutral: 10 },
          { category: 'Servicio', rating: 4.2, totalReviews: 115, positive: 88, negative: 20, neutral: 7 },
          { category: 'Ambiente', rating: 4.0, totalReviews: 110, positive: 82, negative: 22, neutral: 6 },
        ]
        return NextResponse.json(satisfactionData)

      case 'movements':
        const movementsData: InventoryMovement[] = [
          { productName: 'Tomate', type: 'IN', quantity: 20, date: '2024-01-15', user: 'Juan', referenceType: 'PURCHASE' },
          { productName: 'Pollo', type: 'OUT', quantity: 5, date: '2024-01-15', user: 'María', referenceType: 'RECIPE' },
          { productName: 'Harina', type: 'IN', quantity: 50, date: '2024-01-14', user: 'Juan', referenceType: 'PURCHASE' },
          { productName: 'Lechuga', type: 'OUT', quantity: 3, date: '2024-01-14', user: 'Ana', referenceType: 'RECIPE' },
        ]
        return NextResponse.json(movementsData)

      case 'employees':
        const employeesData: EmployeePerformance[] = [
          { name: 'Juan Pérez', role: 'Mesero', ordersServed: 45, totalSales: 2250, averageTicket: 50, efficiency: 92 },
          { name: 'María García', role: 'Mesera', ordersServed: 38, totalSales: 1950, averageTicket: 51, efficiency: 88 },
          { name: 'Ana López', role: 'Cocinera', ordersServed: 52, totalSales: 2850, averageTicket: 55, efficiency: 95 },
        ]
        return NextResponse.json(employeesData)

      case 'costs':
        const costsData: CostAnalysis[] = [
          { category: 'Alimentos', totalCost: 8500, budget: 8000, variance: 500, variancePercentage: 6.25 },
          { category: 'Personal', totalCost: 12000, budget: 12500, variance: -500, variancePercentage: -4.0 },
          { category: 'Servicios', totalCost: 3500, budget: 3000, variance: 500, variancePercentage: 16.67 },
        ]
        return NextResponse.json(costsData)

      case 'seasonal':
        const seasonalData: SeasonalTrend[] = [
          { month: 'Enero', sales: 15000, orders: 320, averageTicket: 46.88, growth: 5.2, season: 'Invierno' },
          { month: 'Febrero', sales: 16200, orders: 340, averageTicket: 47.65, growth: 8.0, season: 'Invierno' },
          { month: 'Marzo', sales: 15800, orders: 335, averageTicket: 47.16, growth: -2.5, season: 'Primavera' },
          { month: 'Abril', sales: 17500, orders: 365, averageTicket: 47.95, growth: 10.8, season: 'Primavera' },
        ]
        return NextResponse.json(seasonalData)

      case 'peak':
        const peakData: PeakHour[] = [
          { hour: '12:00-13:00', sales: 850, orders: 18, customers: 72, isPeak: true },
          { hour: '13:00-14:00', sales: 920, orders: 20, customers: 80, isPeak: true },
          { hour: '19:00-20:00', sales: 1100, orders: 24, customers: 96, isPeak: true },
          { hour: '20:00-21:00', sales: 980, orders: 21, customers: 84, isPeak: true },
          { hour: '15:00-16:00', sales: 320, orders: 7, customers: 28, isPeak: false },
        ]
        return NextResponse.json(peakData)

      case 'table-profit':
        const tableProfitData: TableProfitability[] = [
          { tableName: 'Mesa 1', totalRevenue: 2850, totalCosts: 1140, profit: 1710, profitMargin: 60, turnoverRate: 3.2 },
          { tableName: 'Mesa 2', totalRevenue: 1950, totalCosts: 875, profit: 1075, profitMargin: 55, turnoverRate: 2.8 },
          { tableName: 'Mesa 3', totalRevenue: 3250, totalCosts: 1300, profit: 1950, profitMargin: 60, turnoverRate: 3.5 },
          { tableName: 'Mesa 4', totalRevenue: 1650, totalCosts: 825, profit: 825, profitMargin: 50, turnoverRate: 2.2 },
        ]
        return NextResponse.json(tableProfitData)

      case 'suppliers':
        const suppliersData: SupplierAnalysis[] = [
          { name: 'Proveedor A', totalOrders: 15, totalAmount: 8500, averageDeliveryTime: 2, qualityRating: 4.5, onTimeDelivery: 95 },
          { name: 'Proveedor B', totalOrders: 12, totalAmount: 6200, averageDeliveryTime: 3, qualityRating: 4.2, onTimeDelivery: 88 },
          { name: 'Proveedor C', totalOrders: 8, totalAmount: 3800, averageDeliveryTime: 4, qualityRating: 3.8, onTimeDelivery: 75 },
        ]
        return NextResponse.json(suppliersData)

      case 'payments':
        const paymentsData: PaymentMethod[] = [
          { method: 'Efectivo', transactions: 145, totalAmount: 7250, averageAmount: 50, percentage: 45, fees: 0 },
          { method: 'Tarjeta Crédito', transactions: 98, totalAmount: 5880, averageAmount: 60, percentage: 36, fees: 176 },
          { method: 'Tarjeta Débito', transactions: 67, totalAmount: 3350, averageAmount: 50, percentage: 21, fees: 67 },
        ]
        return NextResponse.json(paymentsData)

      case 'waste':
        const wasteData: WasteAnalysis[] = [
          { productName: 'Tomate', wasteAmount: 5, wasteCost: 12.50, wastePercentage: 8.5, reason: 'Caducidad', date: '2024-01-15' },
          { productName: 'Lechuga', wasteAmount: 3, wasteCost: 4.50, wastePercentage: 6.2, reason: 'Daño', date: '2024-01-14' },
          { productName: 'Pan', wasteAmount: 8, wasteCost: 8.00, wastePercentage: 12.3, reason: 'Sobrante', date: '2024-01-13' },
        ]
        return NextResponse.json(wasteData)

      case 'turnover':
        const turnoverData: InventoryTurnover[] = [
          { productName: 'Tomate', category: 'Vegetales', turnoverRate: 24, daysOfSupply: 15, currentStock: 50, annualUsage: 1200 },
          { productName: 'Pollo', category: 'Carnes', turnoverRate: 18, daysOfSupply: 20, currentStock: 15, annualUsage: 270 },
          { productName: 'Harina', category: 'Granos', turnoverRate: 8, daysOfSupply: 45, currentStock: 100, annualUsage: 800 },
        ]
        return NextResponse.json(turnoverData)

      case 'customers':
        const customersData: FrequentCustomer[] = [
          { customerName: 'Carlos Ruiz', visits: 12, totalSpent: 680, averageTicket: 56.67, lastVisit: '2024-01-15', favoriteCategory: 'Platos Principales' },
          { customerName: 'Ana Martínez', visits: 8, totalSpent: 420, averageTicket: 52.50, lastVisit: '2024-01-14', favoriteCategory: 'Bebidas' },
          { customerName: 'Luis García', visits: 15, totalSpent: 890, averageTicket: 59.33, lastVisit: '2024-01-13', favoriteCategory: 'Postres' },
        ]
        return NextResponse.json(customersData)

      case 'promotions':
        const promotionsData: PromotionAnalysis[] = [
          { promotionName: '2x1 Hamburguesas', type: 'Descuento', discount: 50, salesIncrease: 25, revenueGenerated: 3200, cost: 800, roi: 3.0 },
          { promotionName: 'Happy Hour', type: 'Descuento', discount: 30, salesIncrease: 40, revenueGenerated: 2850, cost: 855, roi: 2.3 },
          { promotionName: 'Menú del Día', type: 'Combo', discount: 20, salesIncrease: 15, revenueGenerated: 1950, cost: 390, roi: 4.0 },
        ]
        return NextResponse.json(promotionsData)

      case 'competitors':
        const competitorsData: CompetitorAnalysis[] = [
          { competitorName: 'Restaurant A', distance: 0.5, priceLevel: 3, qualityRating: 4.2, marketShare: 25, strengths: ['Ubicación', 'Precio'], weaknesses: ['Servicio'] },
          { competitorName: 'Restaurant B', distance: 1.2, priceLevel: 4, qualityRating: 4.5, marketShare: 20, strengths: ['Calidad', 'Ambiente'], weaknesses: ['Precio'] },
          { competitorName: 'Restaurant C', distance: 2.0, priceLevel: 2, qualityRating: 3.8, marketShare: 15, strengths: ['Precio'], weaknesses: ['Calidad'] },
        ]
        return NextResponse.json(competitorsData)

      case 'labor':
        const laborData: LaborAnalysis[] = [
          { period: 'Enero', laborCost: 12000, laborCostPercentage: 28, revenue: 42857, productivity: 95, overtimeHours: 45 },
          { period: 'Febrero', laborCost: 12500, laborCostPercentage: 30, revenue: 41667, productivity: 92, overtimeHours: 52 },
          { period: 'Marzo', laborCost: 11800, laborCostPercentage: 26, revenue: 45385, productivity: 98, overtimeHours: 38 },
        ]
        return NextResponse.json(laborData)

      case 'energy':
        const energyData: EnergyAnalysis[] = [
          { equipment: 'Refrigerador', energyConsumption: 450, cost: 135, efficiency: 92, usageHours: 720, status: 'GOOD' },
          { equipment: 'Horno', energyConsumption: 280, cost: 84, efficiency: 88, usageHours: 240, status: 'EXCELLENT' },
          { equipment: 'Aire Acondicionado', energyConsumption: 680, cost: 204, efficiency: 78, usageHours: 480, status: 'FAIR' },
        ]
        return NextResponse.json(energyData)

      case 'maintenance':
        const maintenanceData: MaintenanceAnalysis[] = [
          { equipment: 'Refrigerador', maintenanceCost: 250, downtime: 4, lastMaintenance: '2024-01-10', nextMaintenance: '2024-04-10', condition: 'GOOD' },
          { equipment: 'Horno', maintenanceCost: 180, downtime: 2, lastMaintenance: '2024-01-05', nextMaintenance: '2024-04-05', condition: 'EXCELLENT' },
          { equipment: 'Lavavajillas', maintenanceCost: 320, downtime: 8, lastMaintenance: '2023-12-20', nextMaintenance: '2024-03-20', condition: 'FAIR' },
        ]
        return NextResponse.json(maintenanceData)

      case 'risks':
        const risksData: RiskAnalysis[] = [
          { riskCategory: 'Falla de Equipo', riskLevel: 7, probability: 25, impact: 40, mitigation: 'Mantenimiento preventivo', status: 'MONITORED' },
          { riskCategory: 'Falta de Personal', riskLevel: 6, probability: 30, impact: 35, mitigation: 'Contratación temporal', status: 'ACCEPTED' },
          { riskCategory: 'Aumento de Costos', riskLevel: 8, probability: 40, impact: 50, mitigation: 'Diversificación proveedores', status: 'MITIGATED' },
        ]
        return NextResponse.json(risksData)

      case 'capacity':
        const capacityData: CapacityAnalysis[] = [
          { area: 'Restaurante', currentCapacity: 80, maximumCapacity: 100, utilizationRate: 80, expansionNeeded: false, estimatedCost: 0 },
          { area: 'Cocina', currentCapacity: 45, maximumCapacity: 50, utilizationRate: 90, expansionNeeded: true, estimatedCost: 25000 },
          { area: 'Estacionamiento', currentCapacity: 25, maximumCapacity: 40, utilizationRate: 62.5, expansionNeeded: false, estimatedCost: 0 },
        ]
        return NextResponse.json(capacityData)

      case 'quality':
        const qualityData: QualityAnalysis[] = [
          { category: 'Comida', qualityScore: 92, inspections: 15, issues: 2, lastInspection: '2024-01-15', trend: 'IMPROVING' },
          { category: 'Servicio', qualityScore: 88, inspections: 12, issues: 3, lastInspection: '2024-01-14', trend: 'STABLE' },
          { category: 'Limpieza', qualityScore: 95, inspections: 18, issues: 1, lastInspection: '2024-01-13', trend: 'IMPROVING' },
        ]
        return NextResponse.json(qualityData)

      case 'sustainability':
        const sustainabilityData: SustainabilityAnalysis[] = [
          { initiative: 'Panel Solar', category: 'Energía', implementationDate: '2024-01-01', cost: 15000, savings: 3000, roi: 0.2, status: 'ACTIVE' },
          { initiative: 'Reciclaje', category: 'Residuos', implementationDate: '2023-12-01', cost: 2500, savings: 800, roi: 0.32, status: 'ACTIVE' },
          { initiative: 'Riego Eficiente', category: 'Agua', implementationDate: '2024-02-01', cost: 5000, savings: 1200, roi: 0.24, status: 'PLANNED' },
        ]
        return NextResponse.json(sustainabilityData)

      case 'innovation':
        const innovationData: InnovationAnalysis[] = [
          { innovation: 'App de Pedidos', category: 'Tecnología', developmentStage: 'Beta', investment: 25000, expectedReturn: 50000, riskLevel: 6, status: 'TESTING' },
          { innovation: 'Menú Digital', category: 'Tecnología', developmentStage: 'Diseño', investment: 15000, expectedReturn: 30000, riskLevel: 4, status: 'DEVELOPMENT' },
          { innovation: 'Delivery Propio', category: 'Servicio', developmentStage: 'Investigación', investment: 40000, expectedReturn: 80000, riskLevel: 8, status: 'RESEARCH' },
        ]
        return NextResponse.json(innovationData)

      default:
        return NextResponse.json({ error: 'Invalid report type' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error generating report:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
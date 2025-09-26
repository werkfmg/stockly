"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"
import { useProducts } from "../../../api/useProducts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function StatusPieChart() {
  const { data: products = [], isLoading, error } = useProducts()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading products</div>

  // نجمع المنتجات حسب status
  const statusCounts = products.reduce((acc, product) => {
    acc[product.status] = (acc[product.status] || 0) + 1
    return acc
  }, {})

  // نجهز بيانات الرسم
  const chartData = Object.entries(statusCounts).map(([status, count], idx) => ({
    status,
    visitors: count,
    fill: `var(--chart-${idx + 1})`, // ألوان مختلفة لكل حالة
  }))

  const chartConfig = {}
  Object.keys(statusCounts).forEach((status, idx) => {
    chartConfig[status] = {
      label: status,
      color: `var(--chart-${idx + 1})`,
    }
  })

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Products by Status</CardTitle>
        <CardDescription>Status distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors" nameKey="status">
              <LabelList
                dataKey="status"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value) => chartConfig[value]?.label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing status distribution of products
        </div>
      </CardFooter>
    </Card>
  )
}

"use client"

import { Pie, PieChart } from "recharts"
import { useProducts } from "../../../api/useProducts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

export function CategoryPieCharts() {
  const { data: products = [], isLoading, error } = useProducts()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading products</div>

  // نحسب عدد المنتجات لكل Category
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1
    return acc
  }, {})

  // نحول البيانات لـ PieChart format
  const chartData = Object.entries(categoryCounts).map(([category, count], idx) => ({
    browser: category, // نستخدم browser key عشان Shadcn PieChart محتاج nameKey
    visitors: count,
    fill: `var(--chart-${idx + 1})`, // كل Category لون مختلف
  }))

  // Config لـ Shadcn UI PieChart
  const chartConfig = {}
  Object.keys(categoryCounts).forEach((category, idx) => {
    chartConfig[category] = {
      label: category,
      color: `var(--chart-${idx + 1})`,
    }
  })

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Products by Category</CardTitle>
        <CardDescription>Distribution of products per category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="visitors" nameKey="browser" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

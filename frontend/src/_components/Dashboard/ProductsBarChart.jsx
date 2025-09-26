"use client";

import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useProducts } from "../../../api/useProducts";
import { getMonthlyData } from "../../../utils/getMonthlyData";

export function ProductsBarChart() {
  const { data: products = [], isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  const chartData = getMonthlyData(products);

  const chartConfig = {
    Electronics: { label: "Electronics", color: "var(--chart-1)" },
    Furniture: { label: "Furniture", color: "var(--chart-2)" },
    "Home Appliances": { label: "Home Appliances", color: "var(--chart-3)" },
    Others: { label: "Others", color: "var(--chart-4)" },
    Published: { label: "Published", color: "var(--chart-5)" },
    Draft: { label: "Draft", color: "var(--chart-6)" },
    Inactive: { label: "Inactive", color: "var(--chart-7)" },
    quantity: { label: "Quantity", color: "var(--chart-8)" },
    price: { label: "Price", color: "var(--chart-9)" },
  };

  return (
    <Card>
      
      <CardHeader>
        
        <CardTitle>Products Multi-Bar Chart</CardTitle>
        <CardDescription>Monthly overview</CardDescription>
      </CardHeader>
      <CardContent>
        
        <ChartContainer config={chartConfig}>
          
          <BarChart data={chartData}>
            
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />{" "}
            <ChartTooltip
              content={<ChartTooltipContent indicator="dashed" />}
            />
            {/* Bars لكل Category */}
            <Bar
              dataKey="Electronics"
              fill="var(--chart-1)"
              radius={4}
              barSize={60}
            />
            <Bar
              dataKey="Furniture"
              fill="var(--chart-2)"
              radius={4}
              barSize={60}
            />
            <Bar
              dataKey="Home Appliances"
              fill="var(--chart-1)"
              radius={4}
              barSize={60}
            />
            <Bar
              dataKey="Others"
              fill="var(--chart-4)"
              radius={4}
              barSize={60}
            />
            {/* Bars لكل Status */}
            <Bar
              dataKey="Published"
              fill="var(--chart-3)"
              radius={4}
              barSize={60}
            />
            <Bar
              dataKey="Draft"
              fill="var(--chart-6)"
              radius={4}
              barSize={60}
            />
            <Bar
              dataKey="Inactive"
              fill="var(--chart-7)"
              radius={4}
              barSize={60}
            />
            {/* Bars للكميات والأسعار */}{" "}
            <Bar
              dataKey="quantity"
              fill="var(--chart-4)"
              radius={4}
              barSize={60}
            />
            <Bar
              dataKey="price"
              fill="var(--chart-3)"
              radius={4}
              barSize={60}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        
        <div className="flex gap-2 leading-none font-medium">
          
          Monthly overview <TrendingUp className="h-4 w-4" />{" "}
        </div>
        <div className="text-muted-foreground leading-none">
          
          Shows categories, status, quantity, and price{" "}
        </div>
      </CardFooter>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductTable } from "./ProductTable";
import { columns } from "../_components/columns";
import ProductDialog from "../_components/ProductInputs/ProductDialog";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/productsApi";

export default function AppTable() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <Card className="mt-12 flex flex-col shadow-none poppins border-none">
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle className="font-bold text-[23px]">Products</CardTitle>
          <p className="text-sm text-slate-600">
            {isLoading ? "Loading..." : `${allProducts.length} products`}
          </p>
        </div>

        <ProductDialog
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      </CardHeader>

      <CardContent>
        <ProductTable
          data={allProducts}
          columns={columns}
          setSelectedProduct={setSelectedProduct}
        />
      </CardContent>
    </Card>
  );
}

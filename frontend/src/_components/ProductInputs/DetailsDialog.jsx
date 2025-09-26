"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProductDetailsDialog({ open, setOpen, product }) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-4 poppins max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-[22px] font-bold">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Detailed information about this product
          </DialogDescription>
        </DialogHeader>

        {/* Product Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card className="shadow-sm">
            <CardContent className="p-3">
              <p className="text-sm text-gray-500">Supplier</p>
              <p className="font-medium break-words">{product.supplier}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-3">
              <p className="text-sm text-gray-500">Supplier Email</p>
              <p className="font-medium break-words">
                {product.supplierEmail || "-"}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-3">
              <p className="text-sm text-gray-500">SKU</p>
              <p className="font-medium">{product.sku}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-3">
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium break-words">{product.category}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-3">
              <p className="text-sm text-gray-500">Status</p>
              <Badge
                className={`${
                  product.status === "Published"
                    ? "bg-green-100 text-green-700"
                    : product.status === "Draft"
                    ? "bg-gray-200 text-gray-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {product.status}
              </Badge>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-3">
              <p className="text-sm text-gray-500">Quantity in Stock</p>
              <p className="font-medium">{product.quantityInStock}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-3">
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">${product.price}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm col-span-1 sm:col-span-2 lg:col-span-4">
            <CardContent className="p-3">
              <p className="text-sm text-gray-500">Description</p>
              <p className="font-medium break-words">
                {product.productDetails && product.productDetails.trim() !== ""
                  ? product.productDetails
                  : "No description available"}
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

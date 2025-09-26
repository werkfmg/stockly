"use client";
import { useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { nanoid } from "nanoid";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import ProductName from "../../_components/ProductInputs/Inputcomponents/ProductName";
import SKU from "../../_components/ProductInputs/Inputcomponents/SKU";
import Supplier from "../../_components/ProductInputs/Inputcomponents/Supllier";
import SupplierEmail from "../../_components/ProductInputs/Inputcomponents/SupplierEmail";
import ProductCategory from "../../_components/ProductInputs/Inputcomponents/ProductCategory";
import Status from "../../_components/ProductInputs/Inputcomponents/Status";
import Quantity from "../../_components/ProductInputs/Inputcomponents/Quantity";
import Price from "../../_components/ProductInputs/Inputcomponents/Price";
import Description from "../../_components/ProductInputs/Inputcomponents/Description";

import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct, updateProduct } from "../../../api/productsApi";

//  Schema
const ProductSchema = z.object({
  name: z.string().min(1, "Product Name is required").max(100),
  sku: z.string().min(1, "SKU is required").regex(/^[a-zA-Z0-9-_]+$/),
  supplier: z.string().min(1, "Supplier is required").max(100),
  supplierEmail: z.string().email("Invalid email").optional(),
  quantityInStock: z.number().int().nonnegative(),
  price: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "", { message: "Price is required" })
    .transform((val) => Number(Number(val).toFixed(2)))
    .pipe(z.number().nonnegative("Price cannot be negative")),
  productDetails: z.string().optional(),
});

export default function ProductDialog({ selectedProduct, setSelectedProduct }) {
  const methods = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      sku: "",
      supplier: "",
      supplierEmail: "",
      quantityInStock: 0,
      price: 0,
      productDetails: "",
    },
  });

  const { reset } = methods;
  const triggerButtonRef = useRef(null);
  const [openProductDialog, setOpenProductDialog] = useState(false);

  const [selectedTab, setSelectedTab] = useState("Published");
  const [selectedCategory, setSelectedCategory] = useState("Electronics");
  const [selectedIcon, setSelectedIcon] = useState("📦"); // أيقونة افتراضية

  const queryClient = useQueryClient();

  // Mutations
  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      Swal.fire({ title: "Product Added Successfully!", icon: "success" });
      setOpenProductDialog(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      Swal.fire({ title: "Product updated successfully!", icon: "success" });
      setOpenProductDialog(false);
      setSelectedProduct(null);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update product",
      });
    },
  });

  //  Prefill form عند Edit أو reset عند Add
  useEffect(() => {
    if (selectedProduct) {
      setOpenProductDialog(true);
      reset({
        name: selectedProduct.name,
        sku: selectedProduct.sku,
        supplier: selectedProduct.supplier,
        supplierEmail: selectedProduct.supplierEmail || "",
        quantityInStock: selectedProduct.quantityInStock,
        price: selectedProduct.price,
        productDetails:
          selectedProduct.productDetails?.trim() || "No description available",
      });
      setSelectedTab(selectedProduct.status);
      setSelectedCategory(selectedProduct.category);
      setSelectedIcon(selectedProduct.icon || "📦");
    } else {
      reset({
        name: "",
        sku: "",
        supplier: "",
        supplierEmail: "",
        quantityInStock: 0,
        price: 0,
        productDetails: "",
      });
      setSelectedTab("Published");
      setSelectedCategory("Electronics");
      setSelectedIcon("📦");
    }
  }, [selectedProduct, reset]);

  // ✅ Submit handler
  const onSubmit = async (data) => {
    if (!selectedProduct) {
      const newProduct = {
        id: nanoid(),
        ...data,
        productDetails:
          data.productDetails?.trim() || "No description available",
        status: selectedTab,
        category: selectedCategory,
        icon: selectedIcon || "📦", // ✅ fallback icon
        createdAt: new Date(),
      };
      addMutation.mutate(newProduct);
    } else {
      const updatedProduct = {
        ...selectedProduct,
        ...data,
        productDetails:
          data.productDetails?.trim() || "No description available",
        status: selectedTab,
        category: selectedCategory,
        icon: selectedIcon || "📦",
      };
      updateMutation.mutate(updatedProduct);
    }
  };

  return (
    <Dialog
      open={openProductDialog}
      onOpenChange={(isOpen) => {
        setOpenProductDialog(isOpen);
        if (!isOpen) setSelectedProduct(null);
      }}
    >
      <DialogTrigger asChild>
        <Button ref={triggerButtonRef} className="h-11">
          Add Product
        </Button>
      </DialogTrigger>

      <DialogContent className="p-7 px-8 poppins max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-[22px]">
            {selectedProduct ? "Edit Product" : "Add Product"}
          </DialogTitle>
          <DialogDescription>
            Fill in the form to {selectedProduct ? "update" : "add"} a product
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
              <ProductName onSelectedIcon={setSelectedIcon} />
              <SKU />
              <Supplier />
              <SupplierEmail />
              <ProductCategory
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <Status
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
              <Quantity />
              <Price />
              <div className="lg:col-span-3 md:col-span-2 col-span-1">
                <Description />
              </div>
            </div>

            <DialogFooter className="mt-9 mb-4 flex gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  reset();
                  setSelectedProduct(null);
                  setOpenProductDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="h-11 px-11">
                {addMutation.isLoading || updateMutation.isLoading
                  ? "Loading..."
                  : selectedProduct
                  ? "Edit Product"
                  : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

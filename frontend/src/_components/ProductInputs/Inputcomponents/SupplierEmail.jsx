"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SupplierEmail() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <Label>Supplier Email</Label>
      <Input
        type="email"
        placeholder="Enter supplier email"
        {...register("supplierEmail", { required: "Supplier Email is required" })}
      />
      {errors.supplierEmail && (
        <span className="text-red-500 text-sm">{errors.supplierEmail.message}</span>
      )}
    </div>
  );
}

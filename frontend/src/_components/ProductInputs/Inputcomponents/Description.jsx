"use client";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Description() {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <Label>Description</Label>
      <Textarea
        placeholder="Enter product description..."
        {...register("productDetails")}
      />
    </div>
  );
}

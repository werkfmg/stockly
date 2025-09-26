import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MdError } from "react-icons/md";
import { useFormContext } from "react-hook-form";

export default function Quantity() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label htmlFor="quantity" className="text-slate-600">
        Quantity
      </Label>
      <Input
        {...register("quantityInStock", { valueAsNumber: true })} 
        id="quantity"
        className="h-11 shadow-none"
        placeholder="34"
      />
      {errors.quantityInStock && (  
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <MdError />
          <p>{errors.quantityInStock.message}</p>
        </div>
      )}
    </div>
  );
}

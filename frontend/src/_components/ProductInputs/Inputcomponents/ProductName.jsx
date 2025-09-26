import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MdError } from "react-icons/md";
import { IconSelector } from "../IconSelector";
import { useFormContext } from "react-hook-form";

export default function ProductName({ onSelectedIcon }) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  // هنا بنخزن اسم الأيقونة (string)
  function getSelectedIcon(iconName) {
    if (iconName) {
      setValue("icon", iconName);
      onSelectedIcon(iconName);
    }
  }

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="product-name" className="text-slate-600">
        Product's Name
      </Label>
      <div className="flex gap-2 items-center">
        <Input
          {...register("name")}
          type="text"
          id="product-name"
          className="h-11 shadow-none"
          placeholder="Laptop..."
        />
        <IconSelector onUpdateIcon={getSelectedIcon} />
      </div>

      {errors.name && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <MdError />
          <p>The product name is required</p>
        </div>
      )}
    </div>
  );
}

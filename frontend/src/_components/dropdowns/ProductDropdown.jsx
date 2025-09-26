"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { MdContentCopy, MdOutlineDelete } from "react-icons/md";
import { FaRegEdit, FaInfoCircle } from "react-icons/fa";
import { toast } from "sonner";
import DeleteDialog from "../ProductInputs/DeleteDialog";
import DetailsDialog from "../ProductInputs/DetailsDialog";
export default function ProductDropdown({ row, onEdit }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [openDetails, setOpenDetails] = useState(false);

  const product = row.original;

  const menuItems = [
    {
      icon: MdContentCopy,
      label: "Copy",
      action: () => {
        navigator.clipboard.writeText(product.name);
        toast.success(`Copied "${product.name}" to clipboard`);
      },
    },
    {
      icon: FaRegEdit,
      label: "Edit",
      action: () => {
        onEdit?.(product); // يمرر المنتج للـ Dialog
      },
    },
    {
      icon: FaInfoCircle,
      label: "Details",
      action: () => {
        setOpenDetails(true); // يفتح الـ Details Dialog
      },
    },
    {
      icon: MdOutlineDelete,
      label: "Delete",
      className: "text-red-600",
      action: () => {
        setProductToDelete(product);
        setOpenDeleteDialog(true);
      },
    },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {menuItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={item.action}
              className={`flex items-center gap-1 p-[10px] ${
                item.className || ""
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Dialog */}
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        product={productToDelete}
      />

      {/* Details Dialog */}
      <DetailsDialog
        open={openDetails}
        setOpen={setOpenDetails}
        product={product}
      />

    </>
  );
}

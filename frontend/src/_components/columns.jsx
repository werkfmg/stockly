"use client";

import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io5";
import * as LuIcons from "react-icons/lu";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";

import { FaCheck, FaInbox } from "react-icons/fa";
import { IoClose, IoArrowDown, IoArrowUp } from "react-icons/io5";
import { ArrowUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ProductDropdown from "./dropdowns/ProductDropdown";

// دمج كل مكتبات الأيقونات
const allIconPacks = {
  ...FaIcons,
  ...IoIcons,
  ...LuIcons,
  ...GiIcons,
  ...MdIcons,
  ...BsIcons,
  ...AiIcons,
};

// دالة لتحويل string → Component
const getIcon = (iconName) => {
  const IconComponent = allIconPacks[iconName];
  return IconComponent ? <IconComponent /> : null;
};

// Sortable Header
const SortableHeader = ({ column, label }) => {
  const isSorted = column.getIsSorted();
  const SortingIcon =
    isSorted === "asc"
      ? IoArrowUp
      : isSorted === "desc"
      ? IoArrowDown
      : ArrowUpDown;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex items-start py-[14px] select-none cursor-pointer p-2 gap-1 ${
            isSorted && "text-primary"
          }`}
          aria-label={`Sort by ${label}`}
        >
          {label}
          <SortingIcon className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom">
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <IoArrowUp className="mr-2 h-4 w-4" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <IoArrowDown className="mr-2 h-4 w-4" />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Table columns
export const columns = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} label="Name" />,
    cell: ({ row }) => {
      const iconName = row.original.icon; // string زي "FaLaptop"
      return (
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-sm bg-primary/10 text-primary">
            {getIcon(iconName)}
          </div>
          <span>{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <SortableHeader column={column} label="SKU" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableHeader column={column} label="Created At" />
    ),
    cell: ({ getValue }) => {
      const val = getValue();
      if (!val) return "-";
      const date = new Date(val);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => <SortableHeader column={column} label="Price" />,
    cell: ({ getValue }) => {
      const val = getValue();
      return val ? `$${Number(val).toFixed(2)}` : "-";
    },
  },
  {
    accessorKey: "category",
    filterFn: "multiSelect",
    header: ({ column }) => <SortableHeader column={column} label="Category" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} label="Status" />,
    filterFn: "multiSelect",
    cell: ({ row }) => {
      const status = row.original.status;

      let colorClass;
      let Icon;

      switch (status) {
        case "Published":
          colorClass = "text-green-600 bg-green-100";
          Icon = FaCheck;
          break;
        case "Draft":
          colorClass = "text-gray-600 bg-gray-200";
          Icon = FaInbox;
          break;
        case "Inactive":
          colorClass = "text-red-600 bg-red-100";
          Icon = IoClose;
          break;
        default:
          colorClass = "text-gray-600 bg-gray-200";
          Icon = FaInbox;
      }

      return (
        <span
          className={`px-3 py-[2px] rounded-full font-medium ${colorClass} flex gap-1 items-center w-fit`}
        >
          {Icon && <Icon className="text-[12px]" />}
          <span className="text-[13px]">{status}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "quantityInStock",
    header: ({ column }) => (
      <SortableHeader column={column} label="Quantity In Stock" />
    ),
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => <SortableHeader column={column} label="Supplier" />,
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const { setSelectedProduct } = table.options.meta || {};
      return (
        <ProductDropdown
          row={row}
          onEdit={(product) => setSelectedProduct(product)}
        />
      );
    },
  },
];

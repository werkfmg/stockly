"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { IoClose } from "react-icons/io5";

import StatusDropdown from "../_components/dropdowns/StatusDropdown";
import { CategoryDropdown } from "../_components/dropdowns/CategoryDropdown";

import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiFirstPage, BiLastPage } from "react-icons/bi";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import PaginationSelection from "./PaginationSelection";

// axios instance
const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Custom filter function
const multiSelectFilter = (row, columnId, filterValue) => {
  const rowValue = String(row.getValue(columnId)).toLowerCase().trim();

  console.log(" Filtering Row:", {
    columnId,
    rowValue,
    filterValue,
    normalizedFilter: filterValue.map((val) => val.toLowerCase().trim()),
  });

  return (
    filterValue.length === 0 ||
    filterValue.some((val) => rowValue === val.toLowerCase().trim())
  );
};



export function ProductTable({ columns, setSelectedProduct }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 });
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // React Query لجلب المنتجات من الـ API
  const { data: allProducts = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get("/products");
      return data;
    },
  });

  //  تحديث الفلاتر حسب الاختيارات
  useEffect(() => {
    setColumnFilters((prev) => {
      const newFilters = prev.filter(
        (filter) => filter.id !== "status" && filter.id !== "category"
      );

      if (selectedStatuses.length > 0)
        newFilters.push({ id: "status", value: selectedStatuses });
      if (selectedCategories.length > 0)
        newFilters.push({ id: "category", value: selectedCategories });

      return newFilters;
    });

    setSorting([{ id: "createdAt", desc: true }]);
  }, [selectedStatuses, selectedCategories]);

  // إعداد الجدول
  const table = useReactTable({
  data: allProducts,
  columns,
  state: { pagination, columnFilters, sorting },
  filterFns: { multiSelect: multiSelectFilter },
  onSortingChange: setSorting,
  getSortedRowModel: getSortedRowModel(),
  onColumnFiltersChange: setColumnFilters,
  getFilteredRowModel: getFilteredRowModel(),
  onPaginationChange: setPagination,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  meta: {
    setSelectedProduct,
  },
});


  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error fetching products.</p>;

  return (
    <div className="poppins">
      {/*  Search + Filters */}
      <div className="flex flex-col gap-3 mb-8 mt-6">
        <div className="flex items-center justify-between">
          <Input
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(e) =>
              table.getColumn("name")?.setFilterValue(e.target.value)
            }
            placeholder="Search by name..."
            className="max-w-sm h-10"
          />
          <div className="flex items-center gap-4">
            <StatusDropdown
              selectedStatuses={selectedStatuses}
              setSelectedStatuses={setSelectedStatuses}
            />
            <CategoryDropdown
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
        </div>

        <FilterArea
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.original.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                        onEdit: setSelectedProduct,
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-5">
        <PaginationSelection
          pagination={pagination}
          setPagination={setPagination}
        />
        <div className="flex gap-6 items-center">
          <span className="text-sm text-gray-500">
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              className="size-9 w-12"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <BiFirstPage />
            </Button>
            <Button
              variant="outline"
              className="size-9 w-12"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <GrFormPrevious />
            </Button>
            <Button
              variant="outline"
              className="size-9 w-12"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <GrFormNext />
            </Button>
            <Button
              variant="outline"
              className="size-9 w-12"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <BiLastPage />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterArea({
  selectedStatuses,
  setSelectedStatuses,
  selectedCategories,
  setSelectedCategories,
}) {
  return (
    <div className="flex gap-3 poppins">
      {selectedStatuses.length > 0 && (
        <div className="border-dashed border rounded-sm p-1 flex gap-2 items-center px-2 text-sm">
          <span className="text-gray-600">Status</span>
          <Separator orientation="vertical" />
          <div className="flex gap-2 items-center">
            {selectedStatuses.length < 3 ? (
              selectedStatuses.map((status, index) => (
                <Badge key={index} variant="secondary">
                  {status}
                </Badge>
              ))
            ) : (
              <Badge variant="secondary">3 Selected</Badge>
            )}
          </div>
        </div>
      )}

      {selectedCategories.length > 0 && (
        <div className="border-dashed border rounded-sm p-1 flex gap-2 items-center px-2 text-sm">
          <span className="text-gray-600">Category</span>
          <Separator orientation="vertical" />
          <div className="flex gap-2 items-center">
            {selectedCategories.length < 3 ? (
              selectedCategories.map((cat, index) => (
                <Badge key={index} variant="secondary">
                  {cat}
                </Badge>
              ))
            ) : (
              <Badge variant="secondary">3 Selected</Badge>
            )}
          </div>
        </div>
      )}

      {(selectedCategories.length > 0 || selectedStatuses.length > 0) && (
        <Button
          onClick={() => {
            setSelectedCategories([]);
            setSelectedStatuses([]);
          }}
          variant="ghost"
          className="p-1 px-2"
        >
          <span>Reset</span> <IoClose />
        </Button>
      )}
    </div>
  );
}

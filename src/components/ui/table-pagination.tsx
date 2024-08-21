"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Table } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between px-2">
      {/* <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              router.push(
                `${pathname}?index=${table.getState().pagination.pageIndex}&size=${Number(value)}&sorting=${table.getState().sorting[0]?.id}&desc=${table.getState().sorting[0]?.desc}`,
              );
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(0);
              router.push(
                `${pathname}?index=${0}&size=${table.getState().pagination.pageSize}&sorting=${table.getState().sorting[0]?.id}&desc=${table.getState().sorting[0]?.desc}`,
              );
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
            {/* <DoubleArrowLeftIcon className="h-4 w-4" /> */}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              router.push(
                `${pathname}?index=${Math.max(0, table.getState().pagination.pageIndex - 1)}&size=${table.getState().pagination.pageSize}&sorting=${table.getState().sorting[0]?.id}&desc=${table.getState().sorting[0]?.desc}`,
              );
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              router.push(
                `${pathname}?index=${Math.min(table.getPageCount() - 1, table.getState().pagination.pageIndex + 1)}&size=${table.getState().pagination.pageSize}&sorting=${table.getState().sorting[0]?.id}&desc=${table.getState().sorting[0]?.desc}`,
              );
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              router.push(
                `${pathname}?index=${table.getPageCount() - 1}&size=${table.getState().pagination.pageSize}&sorting=${table.getState().sorting[0]?.id}&desc=${table.getState().sorting[0]?.desc}`,
              );
              table.setPageIndex(table.getPageCount() - 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
            {/* <DoubleArrowRightIcon className="h-4 w-4" /> */}
          </Button>
        </div>
      </div>
    </div>
  );
}

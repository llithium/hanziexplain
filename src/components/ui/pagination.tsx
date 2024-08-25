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
import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  setPageSize: Dispatch<SetStateAction<number>>;
}

export function Pagination({
  pageIndex,
  pageSize,
  pageCount,
  setPageSize,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between pr-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              setPageSize(Number(value));
              router.push(
                `${pathname}?index=${pageIndex}&size=${Number(value)}`,
              );
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[25, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              router.push(`${pathname}?index=${0}&size=${pageSize}`);
            }}
            disabled={pageIndex <= 0}
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
                `${pathname}?index=${Math.max(0, pageIndex - 1)}&size=${pageSize}`,
              );
            }}
            disabled={pageIndex <= 0}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              router.push(
                `${pathname}?index=${Math.min(pageCount - 1, pageIndex + 1)}&size=${pageSize}`,
              );
            }}
            disabled={pageIndex + 1 >= pageCount}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              router.push(
                `${pathname}?index=${pageCount - 1}&size=${pageSize}`,
              );
            }}
            disabled={pageIndex + 1 >= pageCount}
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

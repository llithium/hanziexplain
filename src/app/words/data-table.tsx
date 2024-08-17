"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import { DataTablePagination } from "@/components/ui/table-pagination";
import { DataTableViewOptions } from "@/components/ui/table-view-options";
import { createClient } from "@supabase/supabase-js";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [data, setData] = useState<TData[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // manualPagination: true,
    rowCount: 116961,
    onSortingChange: setSorting,
    autoResetPageIndex: false,
    // onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  useEffect(() => {
    async function getData() {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      const { data, error } = await supabase
        .from("entries")
        .select("*")
        // TODO: fix sorting
        // .order(sorting[0].id, { ascending: sorting[0].desc })
        .range(
          table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize,
          (table.getState().pagination.pageIndex + 1) *
            table.getState().pagination.pageSize -
            1,
        );
      if (error) {
        throw error;
      }

      const parsedData =
        data &&
        data.map((entry: any) => {
          return {
            ...entry,
            statistics: entry.statistics ? JSON.parse(entry.statistics) : {},
            definitions: entry.definitions ? JSON.parse(entry.definitions) : [],
            simpEtymology: entry.simpEtymology
              ? JSON.parse(entry.simpEtymology)
              : {},
            tradEtymology: entry.tradEtymology
              ? JSON.parse(entry.tradEtymology)
              : {},
            usedAsComponentIn: entry.usedAsComponentIn
              ? JSON.parse(entry.usedAsComponentIn)
              : {},
          };
        });
      setData(parsedData as TData[]);
    }
    getData();
  }, [
    table.getState().pagination.pageIndex,
    table.getState().pagination.pageSize,
    sorting,
  ]);

  return (
    <div className="flex flex-col gap-2">
      <DataTableViewOptions table={table} />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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

      <DataTablePagination table={table} />
    </div>
  );
}

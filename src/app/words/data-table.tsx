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
import { useEffect, useState } from "react";
import { DataTablePagination } from "@/components/ui/table-pagination";
import { DataTableViewOptions } from "@/components/ui/table-view-options";
import { createClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
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
    rowCount: 116961,
    onSortingChange: setSorting,
    autoResetPageIndex: false,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });
  const index = table.getState().pagination.pageIndex;
  const size = table.getState().pagination.pageSize;

  const {
    data: tableData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["dataTableEntries", index, size, sorting],
    queryFn: () => fetchDataTableEntries(index, size, sorting),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (tableData) {
      setData(tableData);
    }
  }, [tableData]);

  async function fetchDataTableEntries(
    index: number,
    size: number,
    sorting: SortingState,
  ) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const { data, error } = await supabase
      .from("entries_data_table")
      .select("*")
      .order(sorting[0] ? sorting[0].id : "boost", {
        ascending: sorting[0] ? !sorting[0].desc : false,
      })
      .order("hskLevel", {
        ascending: true,
      })
      .order("id", {
        ascending: true,
      })
      .range(index * size, (index + 1) * size - 1);
    if (error) {
      throw error;
    }

    return data?.map((entry: any) => ({
      ...entry,
      definitions: entry.definitions ? JSON.parse(entry.definitions) : [],
    })) as TData[];
  }

  return (
    <div
      className={`flex flex-col gap-2 transition-all ${isLoading && "animate-pulse"}`}
    >
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

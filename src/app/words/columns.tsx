"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/column-header";
import { capitalize } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Entry } from "chinese-lexicon";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Entry>[] = [
  {
    accessorKey: "simp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Simplified" />
    ),
    cell: ({ row }) => {
      const simp: string = row.getValue("simp");

      return (
        <div className="text-center">
          <Link
            href={`/${simp}`}
            className="active:opacity-disabled font-sans text-lg transition-opacity hover:opacity-80"
          >
            {simp}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "trad",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Traditional" />
    ),
    cell: ({ row }) => {
      const trad: string = row.getValue("trad");

      return (
        <div className="text-center">
          <Link
            href={`/${trad}`}
            className="active:opacity-disabled text-center font-sans text-lg transition-opacity hover:opacity-80"
          >
            {trad}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "pinyin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pinyin" />
    ),
  },
  {
    accessorKey: "definitions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Definitions" />
    ),
    cell: ({ row }) => {
      const definitions: string[] = row.getValue("definitions");
      return (
        <div className="min-w-96">
          {
            <p>
              {definitions.map((definition, index) => {
                return (
                  <span key={index + definition}>
                    {capitalize(definition)}
                    {index !== definitions.length - 1 && ", "}
                  </span>
                );
              })}
            </p>
          }
        </div>
      );
    },
  },
  {
    accessorKey: "simpEtymology.notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Simplified Etymology" />
    ),
  },
  {
    accessorKey: "tradEtymology.notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Traditional Etymology" />
    ),
  },
  {
    accessorKey: "statistics.hskLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="HSK Level" />
    ),
    cell: ({ row }) => {
      const hskLevel: string = row.getValue("statistics_hskLevel");
      return <div className="text-center">{hskLevel}</div>;
    },
  },
  {
    accessorKey: "boost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Frequency" />
    ),
  },
  {
    accessorKey: "statistics.topWords.length",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Words Used In" />
    ),
  },
  {
    accessorKey: "usedAsComponentIn.simp.count",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Used as Component (Simplified)"
      />
    ),
  },
  {
    accessorKey: "usedAsComponentIn.trad.count",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Used as Component (Traditional)"
      />
    ),
  },
];

"use client";

import { DataTableColumnHeader } from "@/components/ui/column-header";
import { capitalize } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Entry } from "chinese-lexicon";
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
        <div className="w-max max-w-96">
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
    accessorKey: "simpEtymology",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Simplified Etymology" />
    ),
    cell: ({ row }) => {
      const simpEtymology: string = row.getValue("simpEtymology");
      return <div className="w-max max-w-96">{simpEtymology}</div>;
    },
  },
  {
    accessorKey: "tradEtymology",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Traditional Etymology" />
    ),
    cell: ({ row }) => {
      const tradEtymology: string = row.getValue("tradEtymology");
      return <div className="w-max max-w-96">{tradEtymology}</div>;
    },
  },

  {
    accessorKey: "hskLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="HSK Level" />
    ),
    cell: ({ row }) => {
      const hskLevel: string = row.getValue("hskLevel");
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
    accessorKey: "wordsUsedIn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Words Used In" />
    ),
  },
  {
    accessorKey: "usedAsComponentInSimp",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Used as Component (Simplified)"
      />
    ),
  },
  {
    accessorKey: "usedAsComponentInTrad",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Used as Component (Traditional)"
      />
    ),
  },
];

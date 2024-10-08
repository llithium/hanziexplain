import { Metadata } from "next";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata: Metadata = {
  title: "Words · Hanzi Explain",
};

export default function Page() {
  return (
    <div className="px-6 py-2">
      <DataTable columns={columns} />
    </div>
  );
}

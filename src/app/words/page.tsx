import { allEntries } from "chinese-lexicon";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Page() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={allEntries} />
    </div>
  );
}

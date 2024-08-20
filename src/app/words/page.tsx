import { allEntries } from "chinese-lexicon";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Page() {
  return (
    <div className="px-6 py-2">
      <DataTable columns={columns} />
    </div>
  );
}

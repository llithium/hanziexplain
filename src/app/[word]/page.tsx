import { Entry } from "chinese-lexicon";
import { Metadata } from "next";
import StrokeDiagram from "./StrokeDiagram";
import { getURL } from "@/lib/utils";
import Etymology from "./Etymology";
import Components from "./Components";
import Statistics from "./Statistics";
import UsedAsComponentIn from "./UsedAsComponentIn";
import Definitions from "./Definitions";

export async function generateMetadata({
  params,
}: {
  params: { word: string };
}): Promise<Metadata> {
  const word = decodeURIComponent(params.word);
  return { title: `${word} · Hanzi Explain` };
}
export const maxDuration = 30;

export default async function Page({ params }: { params: { word: string } }) {
  const res = await fetch(getURL() + "api/entries/" + params.word);
  if (!res.ok) {
    throw new Error(`Error:${res.status}, ${res.statusText}`);
  }
  const entries = (await res.json()) as Entry[];

  console.log(entries);

  return (
    <div className="mx-auto w-11/12 pb-6 md:w-10/12">
      <div className="flex h-fit w-full items-end gap-2 font-hans">
        <div className="flex items-end gap-2">
          <StrokeDiagram entries={entries} />

          {entries.map((entry, index) => (
            <span key={entry.boost + index} className="font-sans text-2xl">
              {entry.pinyin}
              {index !== entries.length - 1 && ", "}
            </span>
          ))}
        </div>
      </div>
      <Definitions entries={entries} />
      <Etymology entries={entries} />
      <Components entries={entries} />
      <UsedAsComponentIn entries={entries} />
      <Statistics entries={entries} />
    </div>
  );
}

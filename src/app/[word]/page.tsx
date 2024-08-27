import { Entry } from "chinese-lexicon";
import { Metadata } from "next";
import StrokeDiagram from "./StrokeDiagram";
import { getURL } from "@/lib/utils";
import Etymology from "./Etymology";
import Components from "./Components";
import Statistics from "./Statistics";
import UsedAsComponentIn from "./UsedAsComponentIn";
import Definitions from "./Definitions";
import EntryButton from "./EntryButton";
import Examples from "./Examples";

export async function generateMetadata({
  params,
}: {
  params: { word: string };
}): Promise<Metadata> {
  const word = decodeURIComponent(params.word);
  return { title: `${word} · Hanzi Explain` };
}
export const maxDuration = 30;

export function areEntriesSimilar(entries: Entry[]): boolean {
  if (entries.length === 0) return true;

  const getComparableProps = (entry: Entry) => {
    const {
      definitions,
      pinyin,
      searchablePinyin,
      pinyinTones,
      boost,
      statistics,
      ...comparableProps
    } = entry;
    return comparableProps;
  };

  const firstEntryProps = getComparableProps(entries[0]);

  return entries.every((entry) => {
    const currentEntryProps = getComparableProps(entry);
    return (
      JSON.stringify(currentEntryProps) === JSON.stringify(firstEntryProps)
    );
  });
}
export default async function Page({
  params,
  searchParams,
}: {
  params: { word: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const res = await fetch(getURL() + "api/entries/" + params.word);
  if (!res.ok) {
    throw new Error(`Error:${res.status}, ${res.statusText}`);
  }
  const entries = (await res.json()) as Entry[];
  const currentEntry = searchParams.entry ? parseInt(searchParams.entry) : 0;

  return (
    <div className="mx-auto w-11/12 pb-6 md:w-10/12">
      <div className="flex h-fit w-full items-end justify-between gap-2 font-hans">
        <div className="flex items-end gap-2">
          <StrokeDiagram entries={entries} currentEntry={currentEntry} />

          {entries.map((entry, index) => (
            <span key={entry.boost + index} className="font-sans text-2xl">
              {entry.pinyin}
              {index !== entries.length - 1 && ", "}
            </span>
          ))}
        </div>
        {entries.length > 1 && !areEntriesSimilar(entries) ? (
          <EntryButton
            entries={entries}
            currentEntry={currentEntry}
            numberOfEntries={entries.length}
          />
        ) : null}
      </div>
      <Definitions entries={entries} />
      <Examples
        simp={entries[currentEntry].simp}
        trad={entries[currentEntry].trad}
      />
      <Etymology entries={entries} currentEntry={currentEntry} />
      <Components entries={entries} currentEntry={currentEntry} />
      <UsedAsComponentIn entries={entries} currentEntry={currentEntry} />
      <Statistics entries={entries} currentEntry={currentEntry} />
    </div>
  );
}

import { Entry } from "chinese-lexicon";
import { Metadata } from "next";
import StrokeDiagram from "./StrokeDiagram";
import Etymology from "./Etymology";
import Components from "./Components";
import Statistics from "./Statistics";
import UsedAsComponentIn from "./UsedAsComponentIn";
import Definitions from "./Definitions";
import EntryButton from "./EntryButton";
import Examples from "./Examples";
import { createClient } from "@/lib/supabase/server";

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
  const word = decodeURI(params.word);
  const supabase = createClient();
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .or(`simp.eq.${word},trad.eq.${word}`)
    .order("boost", { ascending: false });

  console.log("Data: ", data);

  if (error) {
    console.log("Error: ", error);

    throw error;
  }

  const entries = data as Entry[];
  entries.forEach((entry) => {
    if (typeof entry.definitions === "string" && entry.definitions !== "") {
      entry.definitions = JSON.parse(entry.definitions);
    }
    if (typeof entry.statistics === "string" && entry.statistics !== "") {
      entry.statistics = JSON.parse(entry.statistics);
    }
    if (
      typeof entry.usedAsComponentIn === "string" &&
      entry.usedAsComponentIn !== ""
    ) {
      entry.usedAsComponentIn = JSON.parse(entry.usedAsComponentIn);
    }
    if (typeof entry.simpEtymology === "string" && entry.simpEtymology !== "") {
      entry.simpEtymology = JSON.parse(entry.simpEtymology);
    }
    if (typeof entry.tradEtymology === "string" && entry.tradEtymology !== "") {
      entry.tradEtymology = JSON.parse(entry.tradEtymology);
    }
  });

  const currentEntry = searchParams.entry ? parseInt(searchParams.entry) : 0;
  const showEntries = entries.length > 1 && !areEntriesSimilar(entries);

  return (
    <div className="mx-auto w-11/12 pb-6 md:w-10/12">
      {entries[currentEntry] ? (
        <>
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
            {showEntries ? (
              <EntryButton
                entries={entries}
                currentEntry={currentEntry}
                numberOfEntries={entries.length}
              />
            ) : null}
          </div>
          <Definitions
            currentEntry={currentEntry}
            entries={entries}
            showEntries={showEntries}
          />
          <Examples
            simp={entries[currentEntry].simp}
            trad={entries[currentEntry].trad}
          />
          <Etymology entries={entries} currentEntry={currentEntry} />
          <Components entries={entries} currentEntry={currentEntry} />
          <UsedAsComponentIn entries={entries} currentEntry={currentEntry} />
          <Statistics entries={entries} currentEntry={currentEntry} />
        </>
      ) : (
        <div className="col-span-2 mt-auto flex w-full flex-row justify-center">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            No entry found for <strong>{word}</strong>
          </h2>
        </div>
      )}
    </div>
  );
}

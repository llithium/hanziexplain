import { capitalize, getURL } from "@/lib/utils";
import ExamplesPage from "./ExamplesPage";
import { Entry } from "chinese-lexicon";
import DefinitionCharacters from "../DefinitionCharacters";
import { Metadata } from "next";
import EntryButton from "../EntryButton";
import { areEntriesSimilar } from "../page";

export async function generateMetadata({
  params,
}: {
  params: { word: string };
  searchParams: { [key: string]: string | undefined };
}): Promise<Metadata> {
  const word = decodeURIComponent(params.word);
  return { title: `${word} Examples · Hanzi Explain` };
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
  const showEntries = entries.length > 1 && !areEntriesSimilar(entries);

  return (
    <div className="mx-auto w-11/12 pb-6 md:w-10/12">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3 pb-2 text-lg">
          {entries.map((entry, i) => {
            return (
              <div className="flex flex-col" key={i}>
                <div>
                  <DefinitionCharacters
                    entry={entry}
                    currentEntry={currentEntry}
                    place={i}
                    showEntries={showEntries}
                  />
                  <span className="pl-2">{entry.pinyin}</span>
                  <p className="text-base leading-7">
                    {entry.definitions.map((definition, index) => {
                      return (
                        <span key={index + definition}>
                          {capitalize(definition)}
                          {index !== entry.definitions.length - 1 && ", "}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {entries.length > 1 && !areEntriesSimilar(entries) ? (
          <EntryButton
            entries={entries}
            currentEntry={currentEntry}
            numberOfEntries={entries.length}
            examples
          />
        ) : null}
      </div>
      <ExamplesPage
        simp={entries[currentEntry].simp}
        trad={entries[currentEntry].trad}
      />
    </div>
  );
}

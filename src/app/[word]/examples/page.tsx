import { capitalize, getURL } from "@/lib/utils";
import ExamplesPage from "./ExamplesPage";
import { Entry } from "chinese-lexicon";
import DefinitionCharacters from "../DefinitionCharacters";
import { Metadata } from "next";
import EntryButton from "../EntryButton";
import { areEntriesSimilar } from "../page";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata(props: {
  params: Promise<{ word: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}): Promise<Metadata> {
  const params = await props.params;
  const word = decodeURIComponent(params.word);
  return { title: `${word} Examples · Hanzi Explain` };
}

export default async function Page(props: {
  params: Promise<{ word: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const supabase = createClient();
  const { data, error } = await supabase.rpc(`get_entries`, {
    search_term: decodeURIComponent(params.word),
  });

  if (error) {
    throw error;
  }
  const entries = data as Entry[];
  console.log(entries);

  const currentEntry = searchParams.entry ? parseInt(searchParams.entry) : 0;
  const showEntries = entries.length > 1 && !areEntriesSimilar(entries);

  return (
    <div className="mx-auto w-11/12 pb-6 md:w-10/12">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3 pb-2 text-lg">
          {entries.map((entry, i) => {
            const definitions: string[] = JSON.parse(
              entry.definitions as unknown as string,
            );
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
                    {definitions.map((definition, index) => {
                      return (
                        <span key={index + definition}>
                          {capitalize(definition)}
                          {index !== definitions.length - 1 && ", "}
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

import { capitalize, getURL } from "@/lib/utils";
import ExamplesPage from "./ExamplesPage";
import { Entry } from "chinese-lexicon";
import DefinitionCharacters from "../DefinitionCharacters";

export default async function Page({ params }: { params: { word: string } }) {
  const res = await fetch(getURL() + "api/entries/" + params.word);
  if (!res.ok) {
    throw new Error(`Error:${res.status}, ${res.statusText}`);
  }
  const entries = (await res.json()) as Entry[];
  return (
    <div className="mx-auto w-11/12 pb-6 md:w-10/12">
      <div className="flex flex-col gap-3 pb-2 text-lg">
        {entries.map((entry, i) => {
          return (
            <div className="flex flex-col" key={i}>
              <div>
                <DefinitionCharacters entry={entry} />
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
      <ExamplesPage simp={entries[0].simp} trad={entries[0].trad} />
    </div>
  );
}

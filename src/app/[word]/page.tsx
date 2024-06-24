import { Entry } from "chinese-lexicon";
import { Metadata } from "next";
import StrokeDiagram from "@/app/components/StrokeDiagram";
import capitalize from "@/app/utils/capitalize";
import Link from "next/link";
import getURL from "@/app/utils/getURL";
import Etymology from "./components/Etymology";
import Components from "./components/Components";
import Statistics from "./components/Statistics";
import UsedAsComponentIn from "./components/UsedAsCompnentIn";

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
      <div>
        <h2 className="text-2xl font-semibold">Definition</h2>
        <div className="flex flex-col gap-3 text-lg">
          {entries.map((entry, i) => {
            return (
              <div className="flex flex-col" key={i}>
                <div>
                  {Array.from(entry.simp).map((char, i) => {
                    return (
                      <Link
                        key={char + i}
                        href={char}
                        className="transition-opacity hover:opacity-80 active:opacity-disabled"
                      >
                        <span>{char}</span>
                      </Link>
                    );
                  })}{" "}
                  {entry.simp !== entry.trad &&
                    Array.from(entry.trad).map((char, i) => {
                      return (
                        <Link
                          key={char + i}
                          href={char}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                        >
                          <span>{char}</span>
                        </Link>
                      );
                    })}
                  <span className="pl-2">{entry.pinyin}</span>
                  <div>
                    {entry.definitions.map((definition, index) => {
                      return (
                        <span key={index + definition}>
                          {capitalize(definition)}
                          {index !== entry.definitions.length - 1 && ", "}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Etymology entries={entries} />
      <Components entries={entries} />
      <UsedAsComponentIn entries={entries} />
      <Statistics entries={entries} />
    </div>
  );
}

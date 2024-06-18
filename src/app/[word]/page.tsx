import { Entry } from "chinese-lexicon";
import { Metadata } from "next";
import StrokeDiagram from "@/app/components/StrokeDiagram";
import { Image } from "@nextui-org/image";
import capitalize from "@/app/utils/capitalize";
import Link from "next/link";
import getURL from "@/app/utils/getURL";
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
            <span key={entry.boost + index} className="pb-7 font-sans text-2xl">
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
                  <span> {entry.simp}</span>
                  {entry.simp !== entry.trad && <span> {entry.trad}</span>}
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
      <div className="flex h-full flex-col pt-5">
        {(entries[0].simpEtymology || entries[0].tradEtymology) && (
          <h2 className="text-2xl font-semibold">Etymology</h2>
        )}
        <span className="text-lg">{entries[0].simpEtymology?.notes}</span>
      </div>
      <div className="flex h-full w-full items-center gap-2">
        {entries[0].simpEtymology?.images.map((image, i) => {
          return (
            <>
              <div key={i} className="flex flex-col items-center">
                <Image
                  className="h-32 w-32 dark:bg-current"
                  src={image.url.slice(5, -2)}
                  alt=""
                />
                <span className="text-sm">{image.caption}</span>
              </div>
            </>
          );
        })}
      </div>
      <div>
        {entries[0].simpEtymology?.components.length > 0 && (
          <>
            <h2 className="pt-5 text-2xl font-semibold">Components</h2>
            <div className="flex flex-col gap-2">
              {entries[0].simpEtymology?.components &&
                entries[0].simpEtymology?.components.map((Component, i) => {
                  return (
                    <div key={i}>
                      <div className="flex items-end gap-2">
                        <Link
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${Component.char}`}
                        >
                          <span className="text-lg">{Component.char}</span>
                        </Link>
                        <span>{Component.pinyin}</span>
                      </div>
                      <div className="flex flex-col">
                        <span>Type: {capitalize(Component.type)}</span>
                        <span>
                          Definition: {capitalize(Component.definition)}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
      {entries[0].usedAsComponentIn.simp.count == 0 &&
      entries[0].usedAsComponentIn.trad.count == 0 ? null : (
        <div>
          <h2 className="pt-5 text-2xl font-semibold">Used As Component In</h2>
          <h3 className="pb-3 text-xl font-semibold">
            {entries[0].usedAsComponentIn.simp.count} Simplified Characters
          </h3>
          <div className="flex flex-col gap-1">
            {entries[0].usedAsComponentIn.simp.meaning &&
            entries[0].usedAsComponentIn.simp.meaning?.length > 0 ? (
              <>
                <h4>As Meaning Component:</h4>
                <div className="flex w-full flex-wrap gap-1 font-hans">
                  {entries[0].usedAsComponentIn.simp.meaning?.map(
                    (component, i) => {
                      return (
                        <Link
                          key={i + component}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${component}`}
                        >
                          <span>{component}</span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </>
            ) : null}
            {entries[0].usedAsComponentIn.simp.iconic &&
            entries[0].usedAsComponentIn.simp.iconic?.length > 0 ? (
              <>
                <h4>As Iconic Component:</h4>
                <div className="flex w-full flex-wrap gap-1 font-hans">
                  {entries[0].usedAsComponentIn.simp.iconic?.map(
                    (component, i) => {
                      return (
                        <Link
                          key={i + component}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${component}`}
                        >
                          <span>{component}</span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </>
            ) : null}
            {entries[0].usedAsComponentIn.simp.sound &&
            entries[0].usedAsComponentIn.simp.sound?.length > 0 ? (
              <>
                <h4>As Sound Component:</h4>
                <div className="flex w-full flex-wrap gap-1 font-hans">
                  {entries[0].usedAsComponentIn.simp.sound?.map(
                    (component, i) => {
                      return (
                        <Link
                          key={i + component}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${component}`}
                        >
                          <span>{component}</span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </>
            ) : null}
            {entries[0].usedAsComponentIn.simp.simplified &&
            entries[0].usedAsComponentIn.simp.simplified?.length > 0 ? (
              <>
                <h4>As Simplified Component:</h4>
                <div className="flex w-full flex-wrap gap-1 font-hans">
                  {entries[0].usedAsComponentIn.simp.simplified?.map(
                    (component, i) => {
                      return (
                        <Link
                          key={i + component}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${component}`}
                        >
                          <span>{component}</span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </>
            ) : null}
          </div>
          <h3 className="pb-3 text-xl font-semibold">
            {entries[0].usedAsComponentIn.trad.count} Traditional Characters
          </h3>
          <div className="flex flex-col gap-1">
            {entries[0].usedAsComponentIn.trad.meaning &&
            entries[0].usedAsComponentIn.trad.meaning?.length > 0 ? (
              <>
                <h4>As Meaning Component:</h4>
                <div className="flex w-full flex-wrap gap-1 font-hans">
                  {entries[0].usedAsComponentIn.trad.meaning?.map(
                    (component, i) => {
                      return (
                        <Link
                          key={i + component}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${component}`}
                        >
                          <span>{component}</span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </>
            ) : null}
            {entries[0].usedAsComponentIn.trad.iconic &&
            entries[0].usedAsComponentIn.trad.iconic?.length > 0 ? (
              <>
                <h4>As Iconic Component:</h4>
                <div className="flex w-full flex-wrap gap-1 font-hans">
                  {entries[0].usedAsComponentIn.trad.iconic?.map(
                    (component, i) => {
                      return (
                        <Link
                          key={i + component}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${component}`}
                        >
                          <span>{component}</span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </>
            ) : null}
            {entries[0].usedAsComponentIn.trad.sound &&
            entries[0].usedAsComponentIn.trad.sound?.length > 0 ? (
              <>
                <h4>As Sound Component:</h4>
                <div className="flex w-full flex-wrap gap-1 font-hans">
                  {entries[0].usedAsComponentIn.trad.sound?.map(
                    (component, i) => {
                      return (
                        <Link
                          key={i + component}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${component}`}
                        >
                          <span>{component}</span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
      <div>
        <h2 className="pt-5 text-2xl font-semibold">Statistics</h2>
        <h3 className="pb-3 text-xl font-semibold">
          HSK: {entries[0].statistics.hskLevel}
        </h3>
        {entries[0].statistics.topWords && (
          <>
            <h4 className="text-xl font-semibold">
              Words containing{" "}
              <span className="font-hans">{entries[0].simp}</span> (by
              frequency)
            </h4>
            <div className="flex flex-col gap-1">
              {entries[0].statistics.topWords
                ?.sort((a, b) => b.share - a.share)
                .map((word, i) => {
                  return (
                    <div key={word.share}>
                      {/* <span>{word.share}</span> */}
                      {/* <span className="flex items-end text-sm opacity-70">
                        {i + 1}.
                      </span> */}
                      <div className="flex gap-2 font-hans">
                        <Link
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${word.word}`}
                        >
                          <span className="text-lg">{word.word}</span>
                        </Link>
                        {word.word !== word.trad && (
                          <Link
                            className="transition-opacity hover:opacity-80 active:opacity-disabled"
                            href={`/${word.trad}`}
                          >
                            <span className="text-lg">{word.trad}</span>
                          </Link>
                        )}
                      </div>
                      <span>{capitalize(word.gloss)}</span>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

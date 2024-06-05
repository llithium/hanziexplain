import { getEntries, getEtymology } from "chinese-lexicon";
import { Metadata } from "next";
import StrokeDiagram from "@/app/components/StrokeDiagram";
import { Image } from "@nextui-org/image";
import capitalize from "@/app/utils/capitalize";
export async function generateMetadata({
  params,
}: {
  params: { word: string };
}): Promise<Metadata> {
  const word = decodeURIComponent(params.word);
  return { title: `${word} · Hanzi Explain` };
}

export default function Page({ params }: { params: { word: string } }) {
  const word = decodeURIComponent(params.word);
  const entries = getEntries(word);
  console.log(entries);

  return (
    <div className="mx-auto w-11/12 md:w-10/12">
      <div className="flex h-[150px] w-full items-end gap-2 font-hans">
        <div className="flex items-end gap-2">
          <StrokeDiagram entries={entries} />
          <span className="font-sans text-2xl"> {entries[0].pinyin}</span>
        </div>
      </div>
      <div className="pt-5">
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
                  className="h-32 w-32"
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
          <h2 className="pt-5 text-2xl font-semibold">Components</h2>
        )}
        {entries[0].simpEtymology?.components &&
          entries[0].simpEtymology?.components.map((Component, i) => {
            return (
              <div key={i}>
                <div className="flex items-end gap-2">
                  <span className="text-lg">{Component.char}</span>
                  <span>{Component.pinyin}</span>
                </div>
                <div className="flex flex-col">
                  <span>Type: {capitalize(Component.type)}</span>
                  <span>Definition: {capitalize(Component.definition)}</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

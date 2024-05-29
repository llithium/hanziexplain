import { getEntries } from "chinese-lexicon";
import { Metadata } from "next";
import StrokeDiagram from "../components/StrokeDiagram";
export async function generateMetadata({
  params,
}: {
  params: { word: string };
}): Promise<Metadata> {
  const word = decodeURIComponent(params.word);
  return { title: `${word} - Hanzi Explain` };
}

export default function Page({ params }: { params: { word: string } }) {
  const word = decodeURIComponent(params.word);
  const entries = getEntries(word);
  console.log(entries);

  return (
    <div className="px-2">
      <div className="flex w-full items-end gap-2 font-hans">
        <span className="text-5xl"> {entries[0].simp}</span>
        <span className="text-2xl"> {entries[0].pinyin}</span>
        <StrokeDiagram entries={entries} />
      </div>
      <p>
        {entries[0].definitions.map((definition, i) => {
          return (
            <span key={i + definition}>
              {definition}
              {i !== entries[0].definitions.length - 1 && ", "}
            </span>
          );
        })}
      </p>
    </div>
  );
}

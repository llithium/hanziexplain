import { getEntries } from "chinese-lexicon";
import { Metadata } from "next";
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

  return <div>{entries[0].definitions[0]}</div>;
}

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

  return (
    <div className="w-full px-2 font-hans text-3xl">{entries[0].simp}</div>
  );
}

import { Divider } from "@nextui-org/divider";
import { SearchResult } from "chinese-lexicon";
import { Metadata } from "next";
import Link from "next/link";
import getURL from "../utils/getURL";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q: string };
}): Promise<Metadata> {
  const search = searchParams.q;

  return {
    title: `${search} · Hanzi Explain`,
  };
}
export const maxDuration = 30;

export default async function Search({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const res =
    searchParams.q !== ""
      ? await fetch(getURL() + "api/search?q=" + searchParams.q)
      : null;
  if (res && !res.ok) {
    throw new Error(`Error:${res.status}, ${res.statusText}`);
  }

  const searchResults =
    res !== null ? ((await res.json()) as SearchResult[]) : [];

  return (
    <div className="px-2">
      {searchResults &&
        searchResults.map((result) => {
          return (
            <div
              className="font-hans"
              key={result.simp + result.trad + result.pinyin}
            >
              <Link
                className="transition-opacity hover:opacity-80 active:opacity-disabled"
                href={`/${result.simp}`}
              >
                <div className="flex items-end gap-2">
                  <span className="text-2xl"> {result.simp}</span>
                  {result.simp !== result.trad && (
                    <span className="text-2xl"> {result.trad}</span>
                  )}
                  <span>{result.pinyin}</span>
                </div>
                {result.definitions.map((definition, i) => {
                  return (
                    <span key={i + definition}>
                      {definition}
                      {i !== result.definitions.length - 1 && ", "}
                    </span>
                  );
                })}
              </Link>
              <Divider className="my-2" />
            </div>
          );
        })}
    </div>
  );
}

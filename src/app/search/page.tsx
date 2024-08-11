import { SearchResult } from "chinese-lexicon";
import { Metadata } from "next";
import Link from "next/link";
import { getURL } from "@/lib/utils";
import Characters from "./Characters";
import { Separator } from "@/components/ui/separator";

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
    <ul className="px-2">
      {searchResults.length > 0 || searchParams.q == "" ? (
        searchResults.map((result) => {
          return (
            <li
              className="font-hans"
              key={result.simp + result.trad + result.pinyin}
            >
              <Link
                className="active:opacity-disabled transition-opacity hover:opacity-80"
                href={`/${result.simp}`}
              >
                <div className="flex items-end gap-2">
                  <Characters result={result} />
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
              <Separator className="my-2" />
            </li>
          );
        })
      ) : (
        <div className="col-span-2 mt-auto flex w-full flex-row justify-center">
          <h2 className="text-2xl">
            No results found for{" "}
            <span className="font-semibold tracking-wider">
              {searchParams.q}
            </span>
          </h2>
        </div>
      )}
    </ul>
  );
}

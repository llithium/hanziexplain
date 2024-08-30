import { SearchResult } from "chinese-lexicon";
import { Metadata } from "next";
import Link from "next/link";
import Characters from "./Characters";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";

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
  const supabase = createClient();
  const { data, error } = await supabase.rpc(`search_entries`, {
    search_term: searchParams.q,
  });

  if (error) {
    throw error;
  }
  const searchResults = data as SearchResult[];
  searchResults.forEach((entry) => {
    if (typeof entry.definitions === "string" && entry.definitions !== "") {
      entry.definitions = JSON.parse(entry.definitions);
    }
    if (typeof entry.statistics === "string" && entry.statistics !== "") {
      entry.statistics = JSON.parse(entry.statistics);
    }
    if (
      typeof entry.usedAsComponentIn === "string" &&
      entry.usedAsComponentIn !== ""
    ) {
      entry.usedAsComponentIn = JSON.parse(entry.usedAsComponentIn);
    }
    if (typeof entry.simpEtymology === "string" && entry.simpEtymology !== "") {
      entry.simpEtymology = JSON.parse(entry.simpEtymology);
    }
    if (typeof entry.tradEtymology === "string" && entry.tradEtymology !== "") {
      entry.tradEtymology = JSON.parse(entry.tradEtymology);
    }
  });

  return (
    <div className="mx-auto px-2 pb-6 lg:w-10/12 lg:px-0">
      <ul>
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
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
              No results found for <strong>"{searchParams.q}"</strong>
            </h2>
          </div>
        )}
      </ul>
    </div>
  );
}

"use client";
import RecentlyViewed from "@/app/components/RecentlyViewed";
import { TraditionalContext } from "@/app/components/traditional-provider";
import capitalize from "@/app/utils/capitalize";
import { Entry } from "chinese-lexicon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

const Statistics = ({ entries }: { entries: Entry[] }) => {
  const { tradSelected } = useContext(TraditionalContext);
  const pathname = decodeURI(usePathname());

  if (typeof window !== "undefined") {
    const recentlyViewed: RecentlyViewed[] = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]",
    );
    const recentlyViewedListSize = 20;
    if (!recentlyViewed.some((e) => e.path === pathname)) {
      if (recentlyViewed.length >= recentlyViewedListSize) {
        localStorage.setItem(
          "recentlyViewed",

          JSON.stringify([
            {
              simp: entries[0].simp,
              trad: entries[0].trad,
              pinyin: entries[0].pinyin,
              definition: entries[0].definitions[0],
              path: pathname,
            },
            ...recentlyViewed.slice(0, recentlyViewedListSize - 1),
          ]),
        );
      } else {
        localStorage.setItem(
          "recentlyViewed",

          JSON.stringify([
            {
              simp: entries[0].simp,
              trad: entries[0].trad,
              pinyin: entries[0].pinyin,
              definition: entries[0].definitions[0],
              path: pathname,
            },
            ...recentlyViewed,
          ]),
        );
      }
    }
  }
  return (
    <>
      <div>
        <h2 className="pt-5 text-2xl font-semibold">Statistics</h2>
        <h3 className="pb-3 text-xl font-semibold">
          HSK: {entries[0].statistics.hskLevel}
        </h3>
        {entries[0].statistics.topWords && (
          <>
            <h4 className="text-xl font-semibold">
              Words containing{" "}
              <span className="font-hans">
                {tradSelected ? entries[0].trad : entries[0].simp}
              </span>{" "}
              (by frequency)
            </h4>
            <ul className="flex flex-col gap-1">
              {entries[0].statistics.topWords
                ?.sort((a, b) => b.share - a.share)
                .map((word, i) => {
                  return (
                    <li key={word.share}>
                      {/* <span>{word.share}</span> */}
                      {/* <span className="flex items-end text-sm opacity-70">
                        {i + 1}.
                      </span> */}
                      <div className="flex gap-2 font-hans">
                        {tradSelected ? (
                          <Link
                            className="transition-opacity hover:opacity-80 active:opacity-disabled"
                            href={`/${word.trad}`}
                          >
                            <span className="text-lg">{word.trad}</span>
                          </Link>
                        ) : (
                          <Link
                            className="transition-opacity hover:opacity-80 active:opacity-disabled"
                            href={`/${word.word}`}
                          >
                            <span className="text-lg">{word.word}</span>
                          </Link>
                        )}

                        {tradSelected && word.word !== word.trad && (
                          <Link
                            className="transition-opacity hover:opacity-80 active:opacity-disabled"
                            href={`/${word.word}`}
                          >
                            <span className="text-lg">{word.word}</span>
                          </Link>
                        )}
                        {!tradSelected && word.word !== word.trad && (
                          <Link
                            className="transition-opacity hover:opacity-80 active:opacity-disabled"
                            href={`/${word.trad}`}
                          >
                            <span className="text-lg">{word.trad}</span>
                          </Link>
                        )}
                      </div>
                      <span>{capitalize(word.gloss)}</span>
                    </li>
                  );
                })}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Statistics;

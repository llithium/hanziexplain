"use client";
import { TraditionalContext } from "@/components/providers/traditional-provider";
import addToLocalStorage from "./addToLocalStorage";
import { capitalize } from "@/lib/utils";
import { Entry } from "chinese-lexicon";
import Link from "next/link";
import { useContext } from "react";

const Statistics = ({
  entries,
  currentEntry,
}: {
  entries: Entry[];
  currentEntry: number;
}) => {
  const { tradSelected } = useContext(TraditionalContext);
  addToLocalStorage(entries);

  return (
    <>
      <div>
        <h2 className="pt-5 text-2xl font-semibold">Statistics</h2>
        <h3 className="pb-3 text-xl font-semibold">
          HSK: {entries[currentEntry].statistics.hskLevel}
        </h3>
        {entries[currentEntry].statistics.topWords && (
          <>
            <h4 className="text-xl font-semibold">
              Words containing{" "}
              <span className="font-hans">
                {tradSelected
                  ? entries[currentEntry].trad
                  : entries[currentEntry].simp}
              </span>{" "}
              (by frequency)
            </h4>
            <ul className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {entries[currentEntry].statistics.topWords
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
                            className="active:opacity-disabled transition-opacity hover:opacity-80"
                            href={`/${word.trad}`}
                          >
                            <span className="text-lg">{word.trad}</span>
                          </Link>
                        ) : (
                          <Link
                            className="active:opacity-disabled transition-opacity hover:opacity-80"
                            href={`/${word.word}`}
                          >
                            <span className="text-lg">{word.word}</span>
                          </Link>
                        )}

                        {tradSelected && word.word !== word.trad && (
                          <Link
                            className="active:opacity-disabled transition-opacity hover:opacity-80"
                            href={`/${word.word}`}
                          >
                            <span className="text-lg">{word.word}</span>
                          </Link>
                        )}
                        {!tradSelected && word.word !== word.trad && (
                          <Link
                            className="active:opacity-disabled transition-opacity hover:opacity-80"
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

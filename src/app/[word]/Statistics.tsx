"use client";
import { TraditionalContext } from "@/components/providers/traditional-provider";
import useAddToLocalStorage from "./useAddToLocalStorage";
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
  useAddToLocalStorage(entries);

  return (
    <>
      <div>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Statistics
        </h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          HSK: {entries[currentEntry].statistics.hskLevel}
        </h3>
        {entries[currentEntry].statistics.topWords && (
          <>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
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
                            <span className="text-2xl">{word.trad}</span>
                          </Link>
                        ) : (
                          <Link
                            className="active:opacity-disabled transition-opacity hover:opacity-80"
                            href={`/${word.word}`}
                          >
                            <span className="text-2xl">{word.word}</span>
                          </Link>
                        )}

                        {tradSelected && word.word !== word.trad && (
                          <Link
                            className="active:opacity-disabled transition-opacity hover:opacity-80"
                            href={`/${word.word}`}
                          >
                            <span className="text-2xl">{word.word}</span>
                          </Link>
                        )}
                        {!tradSelected && word.word !== word.trad && (
                          <Link
                            className="active:opacity-disabled transition-opacity hover:opacity-80"
                            href={`/${word.trad}`}
                          >
                            <span className="text-2xl">{word.trad}</span>
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

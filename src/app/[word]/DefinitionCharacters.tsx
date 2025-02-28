"use client";
import { TraditionalContext } from "@/components/providers/traditional-provider";
import { Entry } from "chinese-lexicon";
import Link from "next/link";
import { useContext } from "react";

const DefinitionCharacters = ({
  entry,
  currentEntry,
  place,
  showEntries,
}: {
  entry: Entry;
  currentEntry: number;
  place: number;
  showEntries: boolean;
}) => {
  const { tradSelected } = useContext(TraditionalContext);
  return (
    <div className="inline-flex gap-2">
      <div>
        {tradSelected
          ? Array.from(entry.trad).map((char, i) => {
              return (
                <Link
                  key={char + i}
                  href={`/${char}`}
                  className="active:opacity-disabled transition-opacity hover:opacity-80"
                >
                  <span
                    className={`text-2xl ${showEntries && currentEntry === place && "text-3xl"}`}
                  >
                    {char}
                  </span>
                </Link>
              );
            })
          : Array.from(entry.simp).map((char, i) => {
              return (
                <Link
                  key={char + i}
                  href={`/${char}`}
                  className="active:opacity-disabled transition-opacity hover:opacity-80"
                >
                  <span
                    className={`text-2xl ${showEntries && currentEntry === place && "text-3xl"}`}
                  >
                    {char}
                  </span>
                </Link>
              );
            })}
      </div>
      <div>
        {tradSelected &&
          entry.simp !== entry.trad &&
          Array.from(entry.simp).map((char, i) => {
            return (
              <Link
                key={char + i}
                href={`/${char}`}
                className="active:opacity-disabled transition-opacity hover:opacity-80"
              >
                <span
                  className={`text-2xl ${showEntries && currentEntry === place && "text-3xl transition-opacity"}`}
                >
                  {char}
                </span>
              </Link>
            );
          })}
        {!tradSelected &&
          entry.simp !== entry.trad &&
          Array.from(entry.trad).map((char, i) => {
            return (
              <Link
                key={char + i}
                href={`/${char}`}
                className="active:opacity-disabled transition-opacity hover:opacity-80"
              >
                <span
                  className={`text-2xl ${showEntries && currentEntry === place && "text-3xl transition-opacity"}`}
                >
                  {char}
                </span>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default DefinitionCharacters;

"use client";
import { TraditionalContext } from "@/app/components/traditional-provider";
import { Entry } from "chinese-lexicon";
import Link from "next/link";
import { useContext } from "react";

const DefinitionCharacters = ({ entry }: { entry: Entry }) => {
  const { tradSelected } = useContext(TraditionalContext);
  return (
    <div className="inline-flex gap-2">
      {tradSelected
        ? Array.from(entry.trad).map((char, i) => {
            return (
              <Link
                key={char + i}
                href={char}
                className="transition-opacity hover:opacity-80 active:opacity-disabled"
              >
                <span>{char}</span>
              </Link>
            );
          })
        : Array.from(entry.simp).map((char, i) => {
            return (
              <Link
                key={char + i}
                href={char}
                className="transition-opacity hover:opacity-80 active:opacity-disabled"
              >
                <span>{char}</span>
              </Link>
            );
          })}
      {tradSelected &&
        entry.simp !== entry.trad &&
        Array.from(entry.simp).map((char, i) => {
          return (
            <Link
              key={char + i}
              href={char}
              className="transition-opacity hover:opacity-80 active:opacity-disabled"
            >
              <span>{char}</span>
            </Link>
          );
        })}
      {!tradSelected &&
        entry.simp !== entry.trad &&
        Array.from(entry.trad).map((char, i) => {
          return (
            <Link
              key={char + i}
              href={char}
              className="transition-opacity hover:opacity-80 active:opacity-disabled"
            >
              <span>{char}</span>
            </Link>
          );
        })}
    </div>
  );
};

export default DefinitionCharacters;

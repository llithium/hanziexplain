"use client";
import { TraditionalContext } from "@/app/components/traditional-provider";
import { SearchResult } from "chinese-lexicon";
import { useContext } from "react";

const Characters = ({ result }: { result: SearchResult }) => {
  const { tradSelected } = useContext(TraditionalContext);

  return (
    <>
      {tradSelected ? (
        <span className="text-2xl"> {result.trad}</span>
      ) : (
        <span className="text-2xl"> {result.simp}</span>
      )}
      {!tradSelected && result.simp !== result.trad && (
        <span className="text-2xl"> {result.trad}</span>
      )}
      {tradSelected && result.simp !== result.trad && (
        <span className="text-2xl"> {result.simp}</span>
      )}
    </>
  );
};

export default Characters;

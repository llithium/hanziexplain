"use client";
import { TraditionalContext } from "@/components/providers/traditional-provider";
import { capitalize } from "@/lib/utils";
import { Entry } from "chinese-lexicon";
import Link from "next/link";
import { useContext } from "react";

const Components = ({
  entries,
  currentEntry,
}: {
  entries: Entry[];
  currentEntry: number;
}) => {
  const { tradSelected } = useContext(TraditionalContext);

  const showComponents =
    (entries[currentEntry].simpEtymology &&
      entries[currentEntry].simpEtymology.components.length > 0 &&
      !tradSelected) ||
    (entries[currentEntry].tradEtymology &&
      entries[currentEntry].tradEtymology.components.length > 0 &&
      tradSelected) ||
    (entries[currentEntry].simp === entries[currentEntry].trad &&
      entries[currentEntry].simpEtymology &&
      entries[currentEntry].simpEtymology.components.length > 0);

  return (
    <>
      <div className="pb-2">
        <>
          {showComponents && (
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Components
            </h2>
          )}
          {tradSelected &&
          entries[currentEntry].simp !== entries[currentEntry].trad ? (
            <ul className="flex flex-wrap gap-x-20 gap-y-4">
              {entries[currentEntry].tradEtymology?.components &&
                entries[currentEntry].tradEtymology?.components.map(
                  (Component, i) => {
                    return (
                      <li key={i}>
                        <div className="flex w-80 items-end gap-2">
                          <Link
                            className="active:opacity-disabled transition-opacity hover:opacity-80"
                            href={`/${Component.char}`}
                          >
                            <span className="text-2xl">{Component.char}</span>
                          </Link>
                          <span>{Component.pinyin}</span>
                        </div>
                        <div className="flex flex-col">
                          <span>Type: {capitalize(Component.type)}</span>
                          <span>
                            Definition: {capitalize(Component.definition)}
                          </span>
                        </div>
                      </li>
                    );
                  },
                )}
            </ul>
          ) : (
            <ul className="flex flex-wrap gap-x-20 gap-y-4">
              {entries[currentEntry].simpEtymology?.components &&
                entries[currentEntry].simpEtymology?.components.map(
                  (Component, i) => {
                    return (
                      <li key={i}>
                        <div className="flex w-80 items-end gap-2">
                          <Link
                            className="active:opacity-disabled transition-opacity hover:opacity-80"
                            href={`/${Component.char}`}
                          >
                            <span className="text-2xl">{Component.char}</span>
                          </Link>
                          <span>{Component.pinyin}</span>
                        </div>
                        <div className="flex flex-col">
                          <span>Type: {capitalize(Component.type)}</span>
                          <span>
                            Definition: {capitalize(Component.definition)}
                          </span>
                        </div>
                      </li>
                    );
                  },
                )}
            </ul>
          )}
        </>
      </div>
    </>
  );
};

export default Components;

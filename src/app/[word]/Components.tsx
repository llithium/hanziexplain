"use client";
import { TraditionalContext } from "@/components/providers/traditional-provider";
import { capitalize } from "@/lib/utils";
import { Entry } from "chinese-lexicon";
import Link from "next/link";
import { useContext } from "react";

const Components = ({ entries }: { entries: Entry[] }) => {
  const { tradSelected } = useContext(TraditionalContext);
  // console.log(entries[0].simpEtymology?.components);

  return (
    <>
      <div>
        <>
          {((entries[0].simpEtymology &&
            entries[0].simpEtymology.components.length > 0) ||
            (entries[0].tradEtymology &&
              entries[0].tradEtymology.components.length > 0)) && (
            <h2 className="pt-5 text-2xl font-semibold">Components</h2>
          )}
          {tradSelected ? (
            <ul className="flex flex-wrap gap-x-20 gap-y-4">
              {entries[0].tradEtymology?.components &&
                entries[0].tradEtymology?.components.map((Component, i) => {
                  return (
                    <li key={i}>
                      <div className="flex w-80 items-end gap-2">
                        <Link
                          className="active:opacity-disabled transition-opacity hover:opacity-80"
                          href={`/${Component.char}`}
                        >
                          <span className="text-lg">{Component.char}</span>
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
                })}
            </ul>
          ) : (
            <ul className="flex flex-wrap gap-x-20 gap-y-4">
              {entries[0].simpEtymology?.components &&
                entries[0].simpEtymology?.components.map((Component, i) => {
                  return (
                    <li key={i}>
                      <div className="flex w-80 items-end gap-2">
                        <Link
                          className="active:opacity-disabled transition-opacity hover:opacity-80"
                          href={`/${Component.char}`}
                        >
                          <span className="text-lg">{Component.char}</span>
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
                })}
            </ul>
          )}
        </>
      </div>
    </>
  );
};

export default Components;

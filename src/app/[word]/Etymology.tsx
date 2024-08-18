"use client";
import { TraditionalContext } from "@/components/providers/traditional-provider";
import { Entry } from "chinese-lexicon";
import { useContext } from "react";

const Etymology = ({
  entries,
  currentEntry,
}: {
  entries: Entry[];
  currentEntry: number;
}) => {
  const { tradSelected } = useContext(TraditionalContext);
  return (
    <>
      {tradSelected && entries[currentEntry].tradEtymology ? (
        <div className="flex h-full flex-col pb-2 pt-5">
          {entries[currentEntry].tradEtymology && (
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Etymology
            </h2>
          )}
          <p className="leading-7">
            {entries[currentEntry].tradEtymology?.notes}
          </p>
        </div>
      ) : (
        <div className="flex h-full flex-col pb-2 pt-5">
          {entries[currentEntry].simpEtymology && (
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Etymology
            </h2>
          )}
          <p className="leading-7">
            {entries[currentEntry].simpEtymology?.notes}
          </p>
        </div>
      )}
      <ul className="flex h-full w-full items-center gap-2">
        {entries[currentEntry].tradEtymology?.images.map((image, i) => {
          return (
            <li key={`trad-${i}`} className="flex flex-col items-center">
              <img
                className="h-32 w-32 rounded-sm dark:bg-current"
                src={image.url.slice(5, -2)}
                alt=""
              />
              <span className="text-sm">{image.caption}</span>
            </li>
          );
        })}
        {entries[currentEntry].simpEtymology?.images.map((image, i) => {
          return (
            <li key={`simp-${i}`} className="flex flex-col items-center">
              <img
                className="h-32 w-32 rounded-sm dark:bg-current"
                src={image.url.slice(5, -2)}
                alt=""
              />
              <span className="text-sm">{image.caption}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Etymology;

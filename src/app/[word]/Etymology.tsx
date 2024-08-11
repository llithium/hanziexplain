"use client";
import { TraditionalContext } from "@/components/providers/traditional-provider";
import { Entry } from "chinese-lexicon";
import { useContext } from "react";

const Etymology = ({ entries }: { entries: Entry[] }) => {
  const { tradSelected } = useContext(TraditionalContext);
  return (
    <>
      {tradSelected ? (
        <div className="flex h-full flex-col pt-5">
          {entries[0].tradEtymology && (
            <h2 className="text-2xl font-semibold">Etymology</h2>
          )}
          <p className="text-lg">{entries[0].tradEtymology?.notes}</p>
        </div>
      ) : (
        <div className="flex h-full flex-col pt-5">
          {entries[0].simpEtymology && (
            <h2 className="text-2xl font-semibold">Etymology</h2>
          )}
          <p className="text-lg">{entries[0].simpEtymology?.notes}</p>
        </div>
      )}
      <ul className="flex h-full w-full items-center gap-2">
        {entries[0].tradEtymology?.images.map((image, i) => {
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
        {entries[0].simpEtymology?.images.map((image, i) => {
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

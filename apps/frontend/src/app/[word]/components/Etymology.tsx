"use client";
import { TraditionalContext } from "@/app/components/traditional-provider";
import { Image } from "@nextui-org/image";
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
          <span className="text-lg">{entries[0].tradEtymology?.notes}</span>
        </div>
      ) : (
        <div className="flex h-full flex-col pt-5">
          {entries[0].simpEtymology && (
            <h2 className="text-2xl font-semibold">Etymology</h2>
          )}
          <span className="text-lg">{entries[0].simpEtymology?.notes}</span>
        </div>
      )}
      <div className="flex h-full w-full items-center gap-2">
        {entries[0].tradEtymology?.images.map((image, i) => {
          return (
            <>
              <div key={i} className="flex flex-col items-center">
                <Image
                  className="h-32 w-32 dark:bg-current"
                  src={image.url.slice(5, -2)}
                  alt=""
                />
                <span className="text-sm">{image.caption}</span>
              </div>
            </>
          );
        })}
        {entries[0].simpEtymology?.images.map((image, i) => {
          return (
            <>
              <div key={i} className="flex flex-col items-center">
                <Image
                  className="h-32 w-32 dark:bg-current"
                  src={image.url.slice(5, -2)}
                  alt=""
                />
                <span className="text-sm">{image.caption}</span>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Etymology;

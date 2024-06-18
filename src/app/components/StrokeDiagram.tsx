"use client";
import { Entry } from "chinese-lexicon";
import HanziWriter from "hanzi-writer";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@nextui-org/button";

const StrokeDiagram = ({ entries }: { entries: Entry[] }) => {
  const { theme } = useTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  const simpCharsArray = Array.from(entries[0].simp);
  // const tradCharsArray = Array.from(entries[0].trad);

  useEffect(() => {
    simpCharsArray.map((char, i) => {
      HanziWriter.create(`stroke-diagram-${i}`, char, {
        width: 150,
        height: 150,
        padding: 5,
        outlineColor: theme === "light" ? "#DDD" : "#3c3c3c",
        strokeColor: theme === "light" ? "#11181c" : "#ecedee",
        delayBetweenStrokes: 190, //
      }).loopCharacterAnimation();
    });
  }, [entries, theme, simpCharsArray]);

  return (
    <div className="embla w-[150px] overflow-hidden">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex">
          {simpCharsArray.map((char, i) => {
            return (
              <div
                key={i}
                className="embla__slide min-w-0 shrink-0 grow-0 basis-full"
              >
                <div className="h-fit w-fit rounded-md bg-default-400/10">
                  <svg
                    className="fill-red-500 stroke-purple-400"
                    id={`stroke-diagram-${i}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="120"
                    height="120"
                    display="none"
                  >
                    <line
                      className="stroke-slate-300"
                      x1="5"
                      y1="5"
                      x2="145"
                      y2="145"
                      strokeDasharray="4"
                    />
                    <line
                      className="stroke-slate-300"
                      x1="145"
                      y1="5"
                      x2="5"
                      y2="145"
                      strokeDasharray="4"
                    />
                    <line
                      className="stroke-slate-300"
                      x1="75"
                      y1="5"
                      x2="75"
                      y2="145"
                      strokeDasharray="4"
                    />
                    <line
                      className="stroke-slate-300"
                      x1="5"
                      y1="75"
                      x2="145"
                      y2="75"
                      strokeDasharray="4"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-1 *:bg-opacity-50">
        <Button
          className="embla__prev h-6 w-6 min-w-6 rounded-full"
          isIconOnly
          onClick={scrollPrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M14.91 6.71a.996.996 0 0 0-1.41 0L8.91 11.3a.996.996 0 0 0 0 1.41l4.59 4.59a.996.996 0 1 0 1.41-1.41L11.03 12l3.88-3.88c.38-.39.38-1.03 0-1.41"
            ></path>
          </svg>
        </Button>
        <Button
          className="embla__next h-6 w-6 min-w-6 rounded-full"
          isIconOnly
          onClick={scrollNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9.31 6.71a.996.996 0 0 0 0 1.41L13.19 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.72 6.7c-.38-.38-1.02-.38-1.41.01"
            ></path>
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default StrokeDiagram;

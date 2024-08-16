"use client";
import { Entry } from "chinese-lexicon";
import HanziWriter from "hanzi-writer";
import { useTheme } from "next-themes";
import { useCallback, useContext, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { TraditionalContext } from "@/components/providers/traditional-provider";
import { Button } from "@/components/ui/button";

const StrokeDiagram = ({
  entries,
  currentEntry,
}: {
  entries: Entry[];
  currentEntry: number;
}) => {
  const { theme } = useTheme();
  const { tradSelected } = useContext(TraditionalContext);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  const simpCharsArray = Array.from(entries[currentEntry].simp);
  const tradCharsArray = Array.from(entries[currentEntry].trad);
  const [writers, setWriters] = useState<HanziWriter[]>([]);

  useEffect(() => {
    setWriters([]);

    const writerOptions = {
      width: 150,
      height: 150,
      padding: 5,
      outlineColor: theme === "light" ? "#DDD" : "#3c3c3c",
      strokeColor: theme === "light" ? "#11181c" : "#ecedee",
      delayBetweenStrokes: 190, //
    };
    if (tradSelected) {
      tradCharsArray.forEach((char, i) => {
        const writer = HanziWriter.create(
          `stroke-diagram-${i}`,
          char,
          writerOptions,
        );
        writer.loopCharacterAnimation();
        writer && setWriters((prevWriters) => [...prevWriters, writer]);
      });
    } else {
      simpCharsArray.forEach((char, i) => {
        const writer = HanziWriter.create(
          `stroke-diagram-${i}`,
          char,
          writerOptions,
        );
        writer.loopCharacterAnimation();
        writer && setWriters((prevWriters) => [...prevWriters, writer]);
      });
    }
  }, []);

  useEffect(() => {
    if (tradSelected) {
      writers.forEach((element, i) => {
        element.setCharacter(tradCharsArray[i]);
        element.loopCharacterAnimation();
      });
    } else {
      writers.forEach((element, i) => {
        element.setCharacter(simpCharsArray[i]);
        element.loopCharacterAnimation();
      });
    }
  }, [simpCharsArray, tradCharsArray, tradSelected, writers]);

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
                <div className="bg-default-400/10 h-fit w-fit rounded-md">
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
      {simpCharsArray.length > 1 ? (
        <div className="flex w-full justify-center gap-2 py-1 *:bg-opacity-50">
          <Button
            className="embla__prev h-6 w-6 min-w-6 rounded-full"
            size={"icon"}
            // variant={"ghost"}
            variant={"outline"}
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
            size={"icon"}
            // variant={"ghost"}
            variant={"outline"}
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
      ) : null}
    </div>
  );
};

export default StrokeDiagram;

"use client";
import { Entry } from "chinese-lexicon";
import HanziWriter from "hanzi-writer";
import { useEffect } from "react";

const StrokeDiagram = ({ entries }: { entries: Entry[] }) => {
  useEffect(() => {
    HanziWriter.create("stroke-diagram", entries[0].simp, {
      width: 200,
      height: 200,
      padding: 5,
      delayBetweenStrokes: 190, //
    }).loopCharacterAnimation();
  }, []);
  return (
    <div className="h-fit w-fit rounded-md ">
      <svg
        id="stroke-diagram"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        display="none"
      >
        <line
          x1="0"
          y1="0"
          x2="200"
          y2="200"
          stroke="#DDD"
          stroke-dasharray="4"
        />
        <line
          x1="200"
          y1="0"
          x2="0"
          y2="200"
          stroke="#DDD"
          stroke-dasharray="4"
        />
        <line x1="100" y1="0" x2="100" y2="200" stroke="#DDD" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="#DDD" />
        <rect
          x="0"
          y="0"
          width="200"
          height="200"
          //   rx="10"
          //   ry="10"
          fill="none"
          stroke="#555555"
          stroke-width="1"
        />
      </svg>
    </div>
  );
};

export default StrokeDiagram;

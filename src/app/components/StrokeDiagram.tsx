"use client";
import { Entry } from "chinese-lexicon";
import HanziWriter from "hanzi-writer";
import { useEffect } from "react";

const StrokeDiagram = ({ entries }: { entries: Entry[] }) => {
  useEffect(() => {
    HanziWriter.create("stroke-diagram", entries[0].simp, {
      width: 150,
      height: 150,
      padding: 5,
      delayBetweenStrokes: 190, //
    }).loopCharacterAnimation();
  }, []);
  return (
    <div className="h-fit w-fit rounded-md ">
      <svg
        id="stroke-diagram"
        xmlns="http://www.w3.org/2000/svg"
        width="150"
        height="150"
        display="none"
      >
        <line
          x1="0"
          y1="0"
          x2="150"
          y2="150"
          stroke="#DDD"
          strokeDasharray="4"
        />
        <line
          x1="150"
          y1="0"
          x2="0"
          y2="150"
          stroke="#DDD"
          strokeDasharray="4"
        />
        <line x1="75" y1="0" x2="75" y2="150" stroke="#DDD" />
        <line x1="0" y1="75" x2="150" y2="75" stroke="#DDD" />
        <rect
          x="0"
          y="0"
          width="150"
          height="150"
          //   rx="10"
          //   ry="10"
          fill="none"
          stroke="#555555"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export default StrokeDiagram;

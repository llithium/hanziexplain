"use client";
import { Entry } from "chinese-lexicon";
import HanziWriter from "hanzi-writer";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const StrokeDiagram = ({ entries }: { entries: Entry[] }) => {
  const { theme } = useTheme();
  useEffect(() => {
    HanziWriter.create("stroke-diagram", entries[0].simp, {
      width: 150,
      height: 150,
      padding: 5,
      outlineColor: theme === "light" ? "#DDD" : "#3c3c3c",
      strokeColor: theme === "light" ? "#11181c" : "#ecedee",
      delayBetweenStrokes: 190, //
    }).loopCharacterAnimation();
  }, [entries, theme]);
  return (
    <>
      <div className="h-fit w-fit rounded-md bg-default-400/10">
        <svg
          className="fill-red-500 stroke-purple-400"
          id="stroke-diagram"
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
          {/* <rect
            x="5"
            y="5"
            width="140"
            height="140"
            rx="10"
            ry="10"
            fill="none"
            stroke="#555555"
            strokeWidth="1"
          /> */}
        </svg>
      </div>
    </>
  );
};

export default StrokeDiagram;

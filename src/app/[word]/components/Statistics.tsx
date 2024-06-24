import capitalize from "@/app/utils/capitalize";
import { Entry } from "chinese-lexicon";
import Link from "next/link";

const Statistics = ({ entries }: { entries: Entry[] }) => {
  return (
    <>
      <div>
        <h2 className="pt-5 text-2xl font-semibold">Statistics</h2>
        <h3 className="pb-3 text-xl font-semibold">
          HSK: {entries[0].statistics.hskLevel}
        </h3>
        {entries[0].statistics.topWords && (
          <>
            <h4 className="text-xl font-semibold">
              Words containing{" "}
              <span className="font-hans">{entries[0].simp}</span> (by
              frequency)
            </h4>
            <div className="flex flex-col gap-1">
              {entries[0].statistics.topWords
                ?.sort((a, b) => b.share - a.share)
                .map((word, i) => {
                  return (
                    <div key={word.share}>
                      {/* <span>{word.share}</span> */}
                      {/* <span className="flex items-end text-sm opacity-70">
                        {i + 1}.
                      </span> */}
                      <div className="flex gap-2 font-hans">
                        <Link
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${word.word}`}
                        >
                          <span className="text-lg">{word.word}</span>
                        </Link>
                        {word.word !== word.trad && (
                          <Link
                            className="transition-opacity hover:opacity-80 active:opacity-disabled"
                            href={`/${word.trad}`}
                          >
                            <span className="text-lg">{word.trad}</span>
                          </Link>
                        )}
                      </div>
                      <span>{capitalize(word.gloss)}</span>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Statistics;

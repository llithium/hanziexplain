import capitalize from "@/app/utils/capitalize";
import { Entry } from "chinese-lexicon";
import Link from "next/link";

const Definitions = ({ entries }: { entries: Entry[] }) => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Definition</h2>
        <div className="flex flex-col gap-3 text-lg">
          {entries.map((entry, i) => {
            return (
              <div className="flex flex-col" key={i}>
                <div>
                  {Array.from(entry.simp).map((char, i) => {
                    return (
                      <Link
                        key={char + i}
                        href={char}
                        className="transition-opacity hover:opacity-80 active:opacity-disabled"
                      >
                        <span>{char}</span>
                      </Link>
                    );
                  })}{" "}
                  {entry.simp !== entry.trad &&
                    Array.from(entry.trad).map((char, i) => {
                      return (
                        <Link
                          key={char + i}
                          href={char}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                        >
                          <span>{char}</span>
                        </Link>
                      );
                    })}
                  <span className="pl-2">{entry.pinyin}</span>
                  <div>
                    {entry.definitions.map((definition, index) => {
                      return (
                        <span key={index + definition}>
                          {capitalize(definition)}
                          {index !== entry.definitions.length - 1 && ", "}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Definitions;

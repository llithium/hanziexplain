import { capitalize } from "@/lib/utils";
import { Entry } from "chinese-lexicon";
import Link from "next/link";
import DefinitionCharacters from "./DefinitionCharacters";

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
                  <DefinitionCharacters entry={entry} />
                  <span className="pl-2">{entry.pinyin}</span>
                  <p>
                    {entry.definitions.map((definition, index) => {
                      return (
                        <span key={index + definition}>
                          {capitalize(definition)}
                          {index !== entry.definitions.length - 1 && ", "}
                        </span>
                      );
                    })}
                  </p>
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

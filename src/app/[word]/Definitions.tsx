import { capitalize } from "@/lib/utils";
import { Entry } from "chinese-lexicon";
import DefinitionCharacters from "./DefinitionCharacters";

const Definitions = ({
  entries,
  currentEntry,
  showEntries,
}: {
  entries: Entry[];
  currentEntry: number;
  showEntries: boolean;
}) => {
  return (
    <>
      <div className="pb-2">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Definitions
        </h2>
        <div className="flex flex-col gap-3 text-lg">
          {entries.map((entry, i) => {
            return (
              <div className="flex flex-col" key={i}>
                <div>
                  <DefinitionCharacters
                    entry={entry}
                    currentEntry={currentEntry}
                    place={i}
                    showEntries={showEntries}
                  />
                  <span className="pl-2">{entry.pinyin}</span>
                  <p className="text-base leading-7">
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

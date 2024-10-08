import { Entry } from "chinese-lexicon";
import Link from "next/link";

const UsedAsComponentIn = ({
  entries,
  currentEntry,
}: {
  entries: Entry[];
  currentEntry: number;
}) => {
  return (
    <>
      {entries[currentEntry].usedAsComponentIn.simp.count == 0 &&
      entries[currentEntry].usedAsComponentIn.trad.count == 0 ? null : (
        <div className="pb-2">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Used As Component In
          </h2>
          <div className="flex flex-wrap gap-x-20 gap-y-4">
            <div className="w-80">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                {entries[currentEntry].usedAsComponentIn.simp.count} Simplified
                Characters
              </h3>
              <div className="flex flex-col gap-1">
                {entries[currentEntry].usedAsComponentIn.simp.meaning &&
                entries[currentEntry].usedAsComponentIn.simp.meaning?.length >
                  0 ? (
                  <>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      As Meaning Component:
                    </h4>
                    <div className="flex w-full flex-wrap gap-1 font-hans">
                      {entries[
                        currentEntry
                      ].usedAsComponentIn.simp.meaning?.map((component, i) => {
                        return (
                          <Link
                            key={i + component}
                            className="active:opacity-disabled transition-opacity hover:opacity-80"
                            href={`/${component}`}
                          >
                            <span className="text-2xl">{component}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : null}
                {entries[currentEntry].usedAsComponentIn.simp.iconic &&
                entries[currentEntry].usedAsComponentIn.simp.iconic?.length >
                  0 ? (
                  <>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      As Iconic Component:
                    </h4>
                    <div className="flex w-full flex-wrap gap-1 font-hans">
                      {entries[currentEntry].usedAsComponentIn.simp.iconic?.map(
                        (component, i) => {
                          return (
                            <Link
                              key={i + component}
                              className="active:opacity-disabled transition-opacity hover:opacity-80"
                              href={`/${component}`}
                            >
                              <span className="text-2xl">{component}</span>
                            </Link>
                          );
                        },
                      )}
                    </div>
                  </>
                ) : null}
                {entries[currentEntry].usedAsComponentIn.simp.sound &&
                entries[currentEntry].usedAsComponentIn.simp.sound?.length >
                  0 ? (
                  <>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      As Sound Component:
                    </h4>
                    <div className="flex w-full flex-wrap gap-1 font-hans">
                      {entries[currentEntry].usedAsComponentIn.simp.sound?.map(
                        (component, i) => {
                          return (
                            <Link
                              key={i + component}
                              className="active:opacity-disabled transition-opacity hover:opacity-80"
                              href={`/${component}`}
                            >
                              <span className="text-2xl">{component}</span>
                            </Link>
                          );
                        },
                      )}
                    </div>
                  </>
                ) : null}
                {entries[currentEntry].usedAsComponentIn.simp.simplified &&
                entries[currentEntry].usedAsComponentIn.simp.simplified
                  ?.length > 0 ? (
                  <>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      As Simplified Component:
                    </h4>
                    <div className="flex w-full flex-wrap gap-1 font-hans">
                      {entries[
                        currentEntry
                      ].usedAsComponentIn.simp.simplified?.map(
                        (component, i) => {
                          return (
                            <Link
                              key={i + component}
                              className="active:opacity-disabled transition-opacity hover:opacity-80"
                              href={`/${component}`}
                            >
                              <span className="text-2xl">{component}</span>
                            </Link>
                          );
                        },
                      )}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <div className="w-80">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                {entries[currentEntry].usedAsComponentIn.trad.count} Traditional
                Characters
              </h3>
              <div className="flex flex-col gap-1">
                {entries[currentEntry].usedAsComponentIn.trad.meaning &&
                entries[currentEntry].usedAsComponentIn.trad.meaning?.length >
                  0 ? (
                  <>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      As Meaning Component:
                    </h4>
                    <div className="flex w-full flex-wrap gap-1 font-hans">
                      {entries[
                        currentEntry
                      ].usedAsComponentIn.trad.meaning?.map((component, i) => {
                        return (
                          <Link
                            key={i + component}
                            className="active:opacity-disabled transition-opacity hover:opacity-80"
                            href={`/${component}`}
                          >
                            <span className="text-2xl">{component}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : null}
                {entries[currentEntry].usedAsComponentIn.trad.iconic &&
                entries[currentEntry].usedAsComponentIn.trad.iconic?.length >
                  0 ? (
                  <>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      As Iconic Component:
                    </h4>
                    <div className="flex w-full flex-wrap gap-1 font-hans">
                      {entries[currentEntry].usedAsComponentIn.trad.iconic?.map(
                        (component, i) => {
                          return (
                            <Link
                              key={i + component}
                              className="active:opacity-disabled transition-opacity hover:opacity-80"
                              href={`/${component}`}
                            >
                              <span className="text-2xl">{component}</span>
                            </Link>
                          );
                        },
                      )}
                    </div>
                  </>
                ) : null}
                {entries[currentEntry].usedAsComponentIn.trad.sound &&
                entries[currentEntry].usedAsComponentIn.trad.sound?.length >
                  0 ? (
                  <>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      As Sound Component:
                    </h4>
                    <div className="flex w-full flex-wrap gap-1 font-hans">
                      {entries[currentEntry].usedAsComponentIn.trad.sound?.map(
                        (component, i) => {
                          return (
                            <Link
                              key={i + component}
                              className="active:opacity-disabled transition-opacity hover:opacity-80"
                              href={`/${component}`}
                            >
                              <span className="text-2xl">{component}</span>
                            </Link>
                          );
                        },
                      )}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsedAsComponentIn;

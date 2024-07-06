import { Entry } from "chinese-lexicon";
import Link from "next/link";

const UsedAsComponentIn = ({ entries }: { entries: Entry[] }) => {
  return (
    <>
      {entries[0].usedAsComponentIn.simp.count == 0 &&
      entries[0].usedAsComponentIn.trad.count == 0 ? null : (
        <div>
          <h2 className="pt-5 text-2xl font-semibold">Used As Component In</h2>
          <h3 className="pb-3 text-xl font-semibold">
            {entries[0].usedAsComponentIn.simp.count} Simplified Characters
          </h3>
          <div className="flex flex-col gap-1">
            {entries[0].usedAsComponentIn.simp.meaning &&
            entries[0].usedAsComponentIn.simp.meaning?.length > 0 ? (
              <>
                <h4>As Meaning Component:</h4>
                <div className="flex w-full flex-wrap gap-1 font-hans">
                  {entries[0].usedAsComponentIn.simp.meaning?.map(
                    (component, i) => {
                      return (
                        <Link
                          key={i + component}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${component}`}
                        >
                          <span>{component}</span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </>
            ) : null}
            {entries[0].usedAsComponentIn.simp.iconic &&
            entries[0].usedAsComponentIn.simp.iconic?.length > 0 ? (
              <>
                <h4>As Iconic Component:</h4>
                <div className="flex w-full flex-wrap gap-1 font-hans">
                  {entries[0].usedAsComponentIn.simp.iconic?.map(
                    (component, i) => {
                      return (
                        <Link
                          key={i + component}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${component}`}
                        >
                          <span>{component}</span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </>
            ) : null}
            {entries[0].usedAsComponentIn.simp.sound &&
            entries[0].usedAsComponentIn.simp.sound?.length > 0 ? (
              <>
                <h4>As Sound Component:</h4>
                <div className="flex w-full flex-wrap gap-1 font-hans">
                  {entries[0].usedAsComponentIn.simp.sound?.map(
                    (component, i) => {
                      return (
                        <Link
                          key={i + component}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${component}`}
                        >
                          <span>{component}</span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </>
            ) : null}
            {entries[0].usedAsComponentIn.simp.simplified &&
            entries[0].usedAsComponentIn.simp.simplified?.length > 0 ? (
              <>
                <h4>As Simplified Component:</h4>
                <div className="flex w-full flex-wrap gap-1 font-hans">
                  {entries[0].usedAsComponentIn.simp.simplified?.map(
                    (component, i) => {
                      return (
                        <Link
                          key={i + component}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${component}`}
                        >
                          <span>{component}</span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </>
            ) : null}
          </div>
          <h3 className="pb-3 text-xl font-semibold">
            {entries[0].usedAsComponentIn.trad.count} Traditional Characters
          </h3>
          <div className="flex flex-col gap-1">
            {entries[0].usedAsComponentIn.trad.meaning &&
            entries[0].usedAsComponentIn.trad.meaning?.length > 0 ? (
              <>
                <h4>As Meaning Component:</h4>
                <div className="flex w-full flex-wrap gap-1 font-hans">
                  {entries[0].usedAsComponentIn.trad.meaning?.map(
                    (component, i) => {
                      return (
                        <Link
                          key={i + component}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${component}`}
                        >
                          <span>{component}</span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </>
            ) : null}
            {entries[0].usedAsComponentIn.trad.iconic &&
            entries[0].usedAsComponentIn.trad.iconic?.length > 0 ? (
              <>
                <h4>As Iconic Component:</h4>
                <div className="flex w-full flex-wrap gap-1 font-hans">
                  {entries[0].usedAsComponentIn.trad.iconic?.map(
                    (component, i) => {
                      return (
                        <Link
                          key={i + component}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${component}`}
                        >
                          <span>{component}</span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </>
            ) : null}
            {entries[0].usedAsComponentIn.trad.sound &&
            entries[0].usedAsComponentIn.trad.sound?.length > 0 ? (
              <>
                <h4>As Sound Component:</h4>
                <div className="flex w-full flex-wrap gap-1 font-hans">
                  {entries[0].usedAsComponentIn.trad.sound?.map(
                    (component, i) => {
                      return (
                        <Link
                          key={i + component}
                          className="transition-opacity hover:opacity-80 active:opacity-disabled"
                          href={`/${component}`}
                        >
                          <span>{component}</span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default UsedAsComponentIn;

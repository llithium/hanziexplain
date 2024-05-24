import { search } from "chinese-lexicon";

export default function Search({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const searchResults = search(searchParams.q);

  return (
    <div>
      {searchParams.q &&
        searchResults.map((result) => {
          return (
            <div
              className="font-hans"
              key={result.simp + result.trad + result.pinyin}
            >
              <div className="flex items-end gap-2">
                <span className="text-2xl"> {result.simp}</span>
                {result.simp !== result.trad && (
                  <span className="text-2xl"> {result.trad}</span>
                )}
                <span>{result.pinyin}</span>
              </div>
              {result.definitions.map((definition, i) => {
                return (
                  <span key={i + definition}>
                    {definition}
                    {i !== result.definitions.length - 1 && ", "}
                  </span>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}

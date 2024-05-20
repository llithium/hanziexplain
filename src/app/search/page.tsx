import { search } from "chinese-lexicon";

export default function Search({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const searchResults = search(searchParams.q);
  console.log(searchResults);

  return (
    <div>
      {searchParams.q &&
        searchResults.map((result) => {
          return <div key={result.definitions[0]}> {result.simp}</div>;
        })}
    </div>
  );
}

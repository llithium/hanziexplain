import { search } from "chinese-lexicon";
export const maxDuration = 30; // This function can run for a maximum of 5 seconds

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("q");
  const SearchResults = search(word || "");
  return Response.json(SearchResults);
}

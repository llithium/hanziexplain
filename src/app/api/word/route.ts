import { getEntries, search } from "chinese-lexicon";
export const maxDuration = 30; // This function can run for a maximum of 5 seconds

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const URIword = searchParams.get("q");
  const word = decodeURIComponent(URIword || "");
  const SearchResults = getEntries(word || "");
  return Response.json(SearchResults);
}

import { search } from "chinese-lexicon";
export const maxDuration = 30;

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("q");
  const limitString = searchParams.get("limit");
  if (limitString && term) {
    const limit = parseInt(limitString);
    const SearchResults = search(term, limit);
    return Response.json(SearchResults);
  }
  if (term) {
    const SearchResults = search(term);
    return Response.json(SearchResults);
  }
  return new Response("No search term provided", {
    status: 400,
  });
}

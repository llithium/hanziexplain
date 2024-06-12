import { search } from "chinese-lexicon";
export const maxDuration = 30;

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("q");
  const limitString = searchParams.get("limit");
  if (limitString && term) {
    const limit = parseInt(limitString);
    const searchResults = search(term, limit);
    return Response.json(searchResults);
  }
  if (term) {
    const searchResults = search(term);
    return Response.json(searchResults);
  }
  return Response.json(
    { message: "No search term provided" },
    {
      status: 400,
    },
  );
}

import { getEntries } from "chinese-lexicon";
export const maxDuration = 30;

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const URIword = searchParams.get("q");
  if (URIword) {
    const word = decodeURIComponent(URIword);
    const entries = getEntries(word);
    return Response.json(entries);
  }
  return new Response("No search term provided", {
    status: 400,
  });
}

import { getEntries } from "chinese-lexicon";
export const maxDuration = 30;
export const dynamic = "force-static";

export function GET(
  request: Request,
  { params }: { params: { word: string } },
) {
  const URIword = params.word;
  if (URIword) {
    const word = decodeURIComponent(URIword);
    const entries = getEntries(word);
    if (entries.length === 0) {
      return Response.json(
        { message: "Not found" },
        {
          status: 404,
        },
      );
    }
    return Response.json(entries);
  }
  return Response.json(
    { message: "Missing 'word' parameter" },
    {
      status: 400,
    },
  );
}

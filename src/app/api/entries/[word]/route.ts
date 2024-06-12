import { getEntries } from "chinese-lexicon";
export const maxDuration = 30;

export function GET(
  request: Request,
  { params }: { params: { word: string } },
) {
  console.log(params.word);

  const URIword = params.word;
  if (URIword) {
    const word = decodeURIComponent(URIword);
    const entries = getEntries(word);
    return Response.json(entries);
  }
  return Response.json(
    { message: "No search term provided" },
    {
      status: 400,
    },
  );
}

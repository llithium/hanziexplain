"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Entry } from "chinese-lexicon";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import { useContext } from "react";
import { TraditionalContext } from "@/components/providers/traditional-provider";
import { Separator } from "@/components/ui/separator";

type Example = {
  id: number;
  zh_sentence_id: number;
  zh_sentence: string;
  en_sentence_id: number;
  en_sentence: string;
};

const Examples = ({
  entries,
  currentEntry,
}: {
  entries: Entry[];
  currentEntry: number;
}) => {
  const { tradSelected } = useContext(TraditionalContext);
  const { data, error, isLoading } = useQuery({
    queryKey: [
      "examples",
      entries[currentEntry].simp,
      entries[currentEntry].trad,
      currentEntry,
      tradSelected,
    ],
    queryFn: () => fetchExamples(),
    staleTime: Infinity,
  });

  async function fetchExamples() {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const query = tradSelected
      ? entries[currentEntry].trad
      : entries[currentEntry].simp;
    const { data, error } = await supabase
      .from("example_sentences")
      .select("*")
      .ilike("zh_sentence", `%${query}%`)
      .limit(5);
    if (error) {
      throw error;
    }
    return data as Example[];
  }

  return (
    <div>
      <Collapsible>
        <CollapsibleTrigger className="flex items-end gap-2 pb-2">
          <h2 className="flex scroll-m-20 flex-col justify-center text-3xl font-semibold tracking-tight">
            Examples
          </h2>
          <ChevronsUpDown className="inline-flex h-8 w-8 items-center justify-center whitespace-nowrap rounded-md p-0 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
          <span className="sr-only">Toggle</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {error && (
            <div>
              <p>Error: {error.message}</p>
            </div>
          )}
          {isLoading && (
            <div>
              <p>Loading...</p>
            </div>
          )}
          {!isLoading && !error && data?.length === 0 ? (
            <div>
              <p>No Examples.</p>
            </div>
          ) : (
            <div className="flex h-full flex-col gap-2">
              {data?.map((example, i) => (
                <div key={example.id} className="flex flex-col gap-2">
                  <p className="font-hans text-xl">
                    {
                      example.zh_sentence

                      // .slice(0, 100)
                    }
                  </p>
                  <p className="text-lg">{example.en_sentence}</p>
                  <Separator />
                </div>
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Examples;

"use client";

import { Pagination } from "@/components/ui/pagination";
import { Example } from "../Examples";
import { createClient } from "@supabase/supabase-js";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TraditionalContext } from "@/components/providers/traditional-provider";
import { useContext, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";

const ExamplesPage = ({ simp, trad }: { simp: string; trad: string }) => {
  const { tradSelected } = useContext(TraditionalContext);

  const searchParams = useSearchParams();

  const pageIndex = searchParams.get("index")
    ? parseInt(searchParams.get("index")!)
    : 0;
  const [pageSize, setPageSize] = useState(
    searchParams.get("size") ? parseInt(searchParams.get("size")!) : 50,
  );
  const [itemCount, setItemCount] = useState<number>();
  const [pageCount, setPageCount] = useState<number>(1);
  const [examplesData, setExamplesData] = useState<Example[]>([]);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ["examples", simp, trad, tradSelected, pageIndex, pageSize],
    queryFn: () => fetchExamples(),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  useEffect(() => {
    async function getCount() {
      const query = tradSelected ? trad : simp;
      const { count, error } = await supabase
        .from("example_sentences")
        .select("*", { count: "exact", head: false })
        .ilike("zh_sentence", `%${query}%`);
      if (error) {
        throw error;
      }
      setItemCount(count as number);
    }
    getCount();
  }, []);

  useEffect(() => {
    itemCount && setPageCount(Math.ceil(itemCount / pageSize));
  }, [itemCount, pageSize]);

  useEffect(() => {
    if (data) {
      setExamplesData(data);
    }
  }, [data]);

  async function fetchExamples() {
    const query = tradSelected ? trad : simp;
    const { data, error } = await supabase
      .from("example_sentences")
      .select("*")
      .ilike("zh_sentence", `%${query}%`)
      .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1);
    if (error) {
      throw error;
    }
    return data as Example[];
  }
  return (
    <div>
      <div>
        <h2 className="flex scroll-m-20 flex-col justify-center pb-2 text-3xl font-semibold tracking-tight">
          Examples
        </h2>
        <span className="sr-only">Toggle</span>
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
      </div>
      <Pagination
        pageIndex={pageIndex}
        pageCount={pageCount}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default ExamplesPage;

"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { TraditionalContext } from "../components/providers/traditional-provider";
import { capitalize } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const RecentlyViewed = () => {
  const { tradSelected } = useContext(TraditionalContext);
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewed[]>([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const recentlyViewed: RecentlyViewed[] = JSON.parse(
        localStorage.getItem("recentlyViewed") || "[]",
      );
      setRecentlyViewed(recentlyViewed);
    }
  }, []);
  return recentlyViewed.length > 0 ? (
    <div className="md:basis-1/2">
      <h2 className="py-2 text-center text-2xl font-semibold">
        Recently Viewed Words
      </h2>
      <ScrollArea className="h-[calc(100lvh-150px)]">
        <ol className="flex flex-col gap-1">
          {recentlyViewed.map((word, i) => {
            return (
              <li key={i}>
                <div className="flex items-end gap-2">
                  <Link
                    className="active:opacity-disabled transition-opacity *:font-hans *:text-3xl hover:opacity-80"
                    href={word.path}
                  >
                    <span className="whitespace-nowrap">
                      {tradSelected ? word.trad : word.simp}
                    </span>
                  </Link>
                  <span className="self-end">
                    {capitalize(word.definition)}
                  </span>
                </div>
                <Separator className="my-1" />
              </li>
            );
          })}
        </ol>
      </ScrollArea>
    </div>
  ) : null;
};

export default RecentlyViewed;

interface RecentlyViewed {
  simp: string;
  trad: string;
  pinyin: string;
  path: string;
  definition: string;
}

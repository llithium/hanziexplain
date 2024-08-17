"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { TraditionalContext } from "../components/providers/traditional-provider";
import { capitalize } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="w-5/6 md:w-fit md:max-w-[550px] md:basis-1/2">
      <h2 className="py-2 text-center text-2xl font-semibold">
        Recently Viewed Words
      </h2>
      <ScrollArea className="h-[calc(100lvh-150px)]">
        {recentlyViewed.map((word, i) => {
          return (
            <li key={i} className="flex gap-2">
              <Link
                className="active:opacity-disabled transition-opacity *:font-hans *:text-3xl hover:opacity-80"
                href={word.path}
              >
                <span>{tradSelected ? word.trad : word.simp}</span>
              </Link>
              <span className="self-end">{capitalize(word.definition)}</span>
            </li>
          );
        })}
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

"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { TraditionalContext } from "./traditional-provider";

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
      <div className="flex h-[calc(100lvh-150px)] flex-col overflow-auto">
        {recentlyViewed.reverse().map((e, i) => {
          return (
            <Link
              className="transition-opacity *:font-hans *:text-3xl hover:opacity-80 active:opacity-disabled"
              key={i}
              href={e.path}
            >
              {tradSelected ? <span>{e.trad}</span> : <span>{e.simp}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default RecentlyViewed;

interface RecentlyViewed {
  simp: string;
  trad: string;
  pinyin: string;
  path: string;
}

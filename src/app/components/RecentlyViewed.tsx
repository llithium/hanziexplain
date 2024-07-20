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
  return (
    <div className="">
      {recentlyViewed.length > 0 ? (
        <h2 className="pt-5 text-2xl font-semibold">Recently Viewed</h2>
      ) : null}
      <div className="flex flex-col">
        {recentlyViewed.map((e, i) => {
          return (
            <Link
              className="transition-opacity *:font-hans *:text-xl hover:opacity-80 active:opacity-disabled"
              key={i}
              href={e.path}
            >
              {tradSelected ? <span>{e.trad}</span> : <span>{e.simp}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecentlyViewed;

interface RecentlyViewed {
  simp: string;
  trad: string;
  pinyin: string;
  path: string;
}

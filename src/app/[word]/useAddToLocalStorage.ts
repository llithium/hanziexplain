import RecentlyViewed from "@/app/RecentlyViewed";
import { Entry } from "chinese-lexicon";
import { usePathname } from "next/navigation";

export default function useAddToLocalStorage(entries: Entry[]) {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const pathname = decodeURI(usePathname());
    let recentlyViewed: RecentlyViewed[] = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]",
    );
    const recentlyViewedListSize = 100;
    const newPage = {
      simp: entries[0].simp,
      trad: entries[0].trad,
      pinyin: entries[0].pinyin,
      definition: entries[0].definitions[0],
      path: pathname,
    };

    if (!recentlyViewed.some((e) => e.path === pathname)) {
      if (recentlyViewed.length >= recentlyViewedListSize) {
        recentlyViewed.pop();
        recentlyViewed.unshift(newPage);
        localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
      } else {
        localStorage.setItem(
          "recentlyViewed",

          JSON.stringify([newPage, ...recentlyViewed]),
        );
      }
    } else {
      recentlyViewed = recentlyViewed.filter((e) => e.path !== pathname);
      recentlyViewed.unshift(newPage);
      localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }
  }
}

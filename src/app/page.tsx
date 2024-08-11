import Frequent from "@/app/Frequent";
import RecentlyViewed from "@/app/RecentlyViewed";

export default function Home() {
  return (
    <div className="flex flex-wrap justify-evenly gap-7 px-4 md:flex-nowrap md:px-8">
      <Frequent />
      <RecentlyViewed />
    </div>
  );
}

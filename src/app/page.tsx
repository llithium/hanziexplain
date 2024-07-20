import Frequent from "./components/Frequent";
import RecentlyViewed from "./components/RecentlyViewed";

export default function Home() {
  return (
    <div className="flex flex-wrap justify-evenly px-4 md:flex-nowrap">
      <Frequent />
      <RecentlyViewed />
    </div>
  );
}

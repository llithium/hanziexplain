import HSKWords from "./[word]/components/HSKWords";
import Frequent from "./components/Frequent";
import RecentlyViewed from "./components/RecentlyViewed";

export default function Home() {
  return (
    <div className="flex justify-evenly px-4">
      {/* <Frequent />
      <HSKWords /> */}
      <RecentlyViewed />
    </div>
  );
}

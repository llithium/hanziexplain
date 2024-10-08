"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [rendered, setRendered] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (rendered && debouncedSearchTerm !== "") {
      router.push(`/search?q=${debouncedSearchTerm}`);
    } else if (rendered && debouncedSearchTerm === "") {
      router.push(`/`);
    }

    setRendered(true);
  }, [debouncedSearchTerm, router]);

  return (
    <form
      className="w-full"
      onSubmit={(event) => {
        event.preventDefault();
        router.push(`/search?q=${searchTerm}`);
      }}
    >
      <div className="relative">
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          className="max-w-96 pl-8 sm:max-w-none"
          name="search"
          role="search"
          // placeholder="Search..."
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          // startContent={
          //   <svg
          //     xmlns="http://www.w3.org/2000/svg"
          //     width="32"
          //     height="32"
          //     viewBox="0 0 24 24"
          //   >
          //     <path
          //       fill="currentColor"
          //       d="M15.096 5.904a6.5 6.5 0 1 0-9.192 9.192a6.5 6.5 0 0 0 9.192-9.192M4.49 4.49a8.5 8.5 0 0 1 12.686 11.272l5.345 5.345l-1.414 1.414l-5.345-5.345A8.501 8.501 0 0 1 4.49 4.49"
          //     />
          //   </svg>
          // }
          type="search"
        />
      </div>
    </form>
  );
};

export default SearchInput;

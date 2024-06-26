"use client";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const SearchInput = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [rendered, setRendered] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  useEffect(() => {
    rendered && router.push(`/search?q=${debouncedSearchTerm}`);
    setRendered(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, router]);
  return (
    <Input
      className="w-full"
      name="search"
      onValueChange={(value) => setSearchTerm(value)}
      classNames={{
        base: "w-full h-10",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      size="sm"
      startContent={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M15.096 5.904a6.5 6.5 0 1 0-9.192 9.192a6.5 6.5 0 0 0 9.192-9.192M4.49 4.49a8.5 8.5 0 0 1 12.686 11.272l5.345 5.345l-1.414 1.414l-5.345-5.345A8.501 8.501 0 0 1 4.49 4.49"
          />
        </svg>
      }
      type="search"
    />
  );
};

export default SearchInput;

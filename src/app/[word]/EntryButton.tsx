"use client";
import { Button } from "@/components/ui/button";
import { Entry } from "chinese-lexicon";
import { useRouter } from "next/navigation";

function EntryButton({
  entries,
  currentEntry,
  numberOfEntries,
  examples,
}: {
  entries: Entry[];
  currentEntry: number;
  numberOfEntries: number;
  examples?: boolean;
}) {
  const router = useRouter();
  const nextEntry = () => {
    if (currentEntry < numberOfEntries - 1) {
      router.push(
        `/${entries[currentEntry + 1].simp}${examples ? "/examples" : ""}?entry=${currentEntry + 1}`,
        { scroll: false },
      );
    }
  };
  const prevEntry = () => {
    if (currentEntry > 0) {
      router.push(
        `/${entries[currentEntry - 1].simp}${examples ? "/examples" : ""}?entry=${currentEntry - 1}`,
        { scroll: false },
      );
    }
  };
  return (
    <div>
      <div className="text-2xl">
        Entry{" "}
        <span>
          {currentEntry + 1}/{numberOfEntries}{" "}
        </span>
      </div>
      <div>
        {numberOfEntries > 1 ? (
          <div className="flex w-full justify-center gap-2 py-1 *:bg-opacity-50">
            <Button
              className="embla__prev h-6 w-6 min-w-6 rounded-full"
              size={"icon"}
              // variant={"ghost"}
              variant={"outline"}
              onClick={prevEntry}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M14.91 6.71a.996.996 0 0 0-1.41 0L8.91 11.3a.996.996 0 0 0 0 1.41l4.59 4.59a.996.996 0 1 0 1.41-1.41L11.03 12l3.88-3.88c.38-.39.38-1.03 0-1.41"
                ></path>
              </svg>
            </Button>
            <Button
              className="embla__next h-6 w-6 min-w-6 rounded-full"
              size={"icon"}
              // variant={"ghost"}
              variant={"outline"}
              onClick={nextEntry}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.31 6.71a.996.996 0 0 0 0 1.41L13.19 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.72 6.7c-.38-.38-1.02-.38-1.41.01"
                ></path>
              </svg>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default EntryButton;

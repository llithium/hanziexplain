"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 h-svh w-screen">
      <div className="mx-auto flex h-full w-fit flex-col items-center justify-center gap-2">
        <h2 className="text-danger-500 text-xl font-bold">
          Something went wrong!
        </h2>
        <p className="text-center">{error.message}</p>
        <Button color="default" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}

"use client";
import PuffLoader from "react-spinners/PuffLoader";
export default function Loading() {
  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
      <PuffLoader color="hsl(var(--foreground))" size={125} />
    </div>
  );
}

"use client";
import { TailSpin } from "react-loader-spinner";
export default function Loading() {
  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
      <TailSpin color="hsl(var(--foreground))" height={150} width={150} />
    </div>
  );
}

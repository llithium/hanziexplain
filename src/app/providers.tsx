"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import TraditionalProvider from "@/components/providers/traditional-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextThemesProvider attribute="class" defaultTheme="system">
      <TraditionalProvider>{children}</TraditionalProvider>
    </NextThemesProvider>
  );
}

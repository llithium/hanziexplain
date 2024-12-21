import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

import Navbar from "@/components/ui/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  preload: false,
});

export const metadata: Metadata = {
  title: "Hanzi Explain",
  //todo description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansSC.variable} font-sans`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {theme === "light" && <LightIcon />}
          {theme === "dark" && <DarkIcon />}
          {theme === "system" && <SystemIcon />}
        </DropdownMenuTrigger>
        <DropdownMenuContent aria-label="Themes">
          <DropdownMenuItem
            className="flex gap-2"
            key="light"
            onClick={() => setTheme("light")}
          >
            <LightIcon />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2"
            key="dark"
            onClick={() => setTheme("dark")}
          >
            <DarkIcon />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2"
            key="system"
            onClick={() => setTheme("system")}
          >
            <SystemIcon />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const LightIcon = () => {
  return (
    <svg
      className="active:opacity-disabled transition-opacity hover:opacity-80"
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M10.999-.004h2.004V2h-2.004zM4.223 2.803L5.64 4.22L4.223 5.637L2.806 4.22zm15.556 0l1.417 1.417l-1.417 1.417l-1.417-1.417zM12 6a6 6 0 1 0 0 12a6 6 0 0 0 0-12m-8 6a8 8 0 1 1 16 0a8 8 0 0 1-16 0m-4.001-1.004h2.004V13H-.001zm22 0h2.004V13h-2.004zM4.223 18.36l1.417 1.417l-1.417 1.418l-1.417-1.418zm15.556 0l1.417 1.417l-1.417 1.417l-1.417-1.417zM11 21.997h2.004V24H11z"
      />
    </svg>
  );
};

const DarkIcon = () => {
  return (
    <svg
      className="active:opacity-disabled transition-opacity hover:opacity-80"
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m15.844 3.344l-1.428.781l1.428.781l.781 1.428l.781-1.428l1.428-.781l-1.428-.781l-.781-1.428zm-5.432.814A8 8 0 1 0 18.93 16A9 9 0 0 1 10 7c0-.98.131-1.937.412-2.842M2 12C2 6.477 6.477 2 12 2h1.734l-.868 1.5C12.287 4.5 12 5.69 12 7a7 7 0 0 0 8.348 6.87l1.682-.327l-.543 1.626C20.162 19.137 16.417 22 12 22C6.477 22 2 17.523 2 12m18.5-5.584l.914 1.67l1.67.914l-1.67.914l-.914 1.67l-.914-1.67L17.916 9l1.67-.914z"
      />
    </svg>
  );
};

const SystemIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M1 2h22v4h-2V4H3v13h9v2H1zm13 6h10v14H14zm2 2v10h6V10zm1.998 6.998h2.004v2.004h-2.004zM5 20h7v2H5z"
      />
    </svg>
  );
};
export default ThemeSwitcher;

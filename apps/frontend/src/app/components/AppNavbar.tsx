"use client";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SearchInput from "@/app/components/SearchInput";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import TraditionalSwitcher from "./TraditionalSwitcher";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar className="z-50 mb-3" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent
        justify="start"
        className="basis-8 data-[justify=start]:flex-grow-0"
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link
            className="transition-opacity hover:opacity-80 active:opacity-disabled"
            color="foreground"
            href="/"
          >
            Home
          </Link>
        </NavbarItem>
        {/* <Dropdown>
          <NavbarItem isActive={pathname.startsWith("/default")}>
            <DropdownTrigger>
              <Button
                className={`flex items-center px-0 pl-2 text-medium text-foreground transition-opacity hover:opacity-80 active:opacity-disabled ${
                  pathname.startsWith("/default") && "font-semibold"
                }`}
                variant="light"
                endContent={
                  <svg
                    className="px-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#888888"
                      d="m17.5 8.086l-5.5 5.5l-5.5-5.5L5.086 9.5L12 16.414L18.914 9.5z"
                    />
                  </svg>
                }
              >
                Default
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="default"
            className="w-44"
            itemClasses={{
              base: "gap-4",
              title: "text-center text-medium",
            }}
          >
            <DropdownItem as={Link} href="/default" key="upcoming">
              Default
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
      </NavbarContent>
      <NavbarContent justify="start">
        <SearchInput />
      </NavbarContent>
      <NavbarContent justify="end" className="data-[justify=end]:flex-grow-0">
        {/* <NavbarItem>
          <Link
            className="transition-opacity hover:opacity-80 active:opacity-disabled"
            color="foreground"
            href="/login"
          >
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/signup" variant="shadow">
            Sign Up
          </Button>
        </NavbarItem> */}
        <NavbarItem>
          <TraditionalSwitcher />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem isActive={pathname === "/"}>
          <Link
            color="foreground"
            className="w-full transition-opacity hover:opacity-80 active:opacity-disabled"
            href="/"
          >
            Home
          </Link>
        </NavbarMenuItem>
        {/* <Dropdown>
          <NavbarMenuItem isActive={pathname.startsWith("/default")}>
            <DropdownTrigger>
              <Button
                className={`flex h-7 items-center px-0 text-lg text-foreground transition-opacity hover:opacity-80 active:opacity-disabled ${
                  pathname.startsWith("/default") && "font-semibold"
                }`}
                // color="foreground"
                variant="light"
                size="sm"
                endContent={
                  <svg
                    className="px-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#888888"
                      d="m17.5 8.086l-5.5 5.5l-5.5-5.5L5.086 9.5L12 16.414L18.914 9.5z"
                    />
                  </svg>
                }
              >
                Default
              </Button>
            </DropdownTrigger>
          </NavbarMenuItem>
          <DropdownMenu
            aria-label="default"
            className="w-44"
            itemClasses={{
              base: "gap-4",
              title: "text-center text-medium",
            }}
          >
            <DropdownItem as={Link} href="/default" key="default">
              Default
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
      </NavbarMenu>
    </Navbar>
  );
}

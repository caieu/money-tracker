"use client";

import { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { LoginButton } from "./login-button";
import { ThemeToggle } from "./theme-toggle";
import { MoneyTracker } from "./icons/money-tracker";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <MoneyTracker />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                MoneyTracker
              </h1>
            </Link>
          </div>
          <div className="flex items-center">
            {isDesktop ? (
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LoginButton />
              </div>
            ) : (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col items-end gap-4">
                    <ThemeToggle />
                    <LoginButton />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

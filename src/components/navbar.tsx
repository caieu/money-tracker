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

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Money Tracker
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            {isDesktop ? (
              <LoginButton />
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
                  <div className="mt-6 flex flex-col space-y-4">
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

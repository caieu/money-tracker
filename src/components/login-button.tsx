"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

export const LoginButton = () => {
  const { data: session, status } = useSession();

  return (
    <Link
      href={session ? "/api/auth/signout" : "/api/auth/signin"}
      className="w-full"
    >
      <Button disabled={status === "loading"} className="w-full">
        {session ? "Sign out" : "Sign in"}
      </Button>
    </Link>
  );
};

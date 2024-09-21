"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

export const LoginButton = () => {
  const { data: session, status } = useSession();

  return (
    <Link
      href={session ? "/api/auth/signout" : "/api/auth/signin"}
      className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
    >
      <Button disabled={status === "loading"}>
        {session ? "Sign out" : "Sign in"}
      </Button>
    </Link>
  );
};

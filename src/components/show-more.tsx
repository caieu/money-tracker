"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const ShowMore = ({ hasNext }: { hasNext: boolean }) => {
  const router = useRouter();

  if (!hasNext) return null;

  return (
    <Button
      onClick={() => {
        router.push(`/transaction`);
      }}
      variant="link"
    >
      Show More
    </Button>
  );
};

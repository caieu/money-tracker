import { type RouterOutputs } from "@/trpc/react";

export type TransactionType = "loan" | "debt";

export type Transaction =
  RouterOutputs["transaction"]["getAll"]["items"][number];

export type RelatedUser =
  RouterOutputs["transaction"]["getById"]["relatedUser"];

import { type RouterOutputs } from "@/trpc/react";

export type TransactionType = "loan" | "debt";

export type Transaction = RouterOutputs["transaction"]["getAll"][number];

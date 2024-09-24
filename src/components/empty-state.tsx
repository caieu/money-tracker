import { HandCoins, Plus, Receipt } from "lucide-react";
import { Card } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

export const EmptyState = () => (
  <Card className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-background p-8 text-center">
    <div className="flex items-center justify-center gap-4">
      <HandCoins className="h-16 w-16 text-gray-400" />
      <Receipt className="h-16 w-16 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-foreground">No Transactions</h3>
    <p className="text-sm text-gray-500">
      Start tracking your loans and debts by creating a new transaction.
    </p>
    <Link href="/add" passHref>
      <Button className="mt-2">
        <Plus className="mr-2 h-4 w-4" />
        Add New Transaction
      </Button>
    </Link>
  </Card>
);

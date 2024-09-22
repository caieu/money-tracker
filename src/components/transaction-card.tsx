import { type Transaction } from "@/lib/types";
import { Card } from "./ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";

export const TransactionCard = ({
  transaction: { id, type, relatedUser, createdAt, amount },
}: {
  transaction: Transaction;
}) => {
  return (
    <Link href={`/transaction/${id}`}>
      <Card
        key={id}
        className="flex justify-between bg-white p-4 dark:bg-gray-800"
      >
        <div className="flex flex-col">
          <div className="text-lg font-semibold">
            {`${type === "loan" ? "Loan to" : "Debt from"} ${relatedUser?.name}`}
          </div>
          <div className="text-sm text-gray-500">{formatDate(createdAt)}</div>
        </div>
        <div>
          <div className="text-lg font-semibold">{formatCurrency(amount)}</div>
        </div>
      </Card>
    </Link>
  );
};

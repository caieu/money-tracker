import { Header } from "@/components/header";
import { InfoCard } from "@/components/info-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Receipt, Plus, HandCoins } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { totalLoans, totalDebts } = await api.transaction.getSummary();
  const transactions = await api.transaction.getAll();
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <InfoCard
          title="Total Loans"
          icon={<HandCoins className="h-6 w-6 text-green-600" />}
        >
          <div className="text-2xl font-bold">${totalLoans.toFixed(2)}</div>
        </InfoCard>
        <InfoCard
          title="Total Debts"
          icon={<Receipt className="h-6 w-6 text-red-600" />}
        >
          <div className="text-2xl font-bold">${totalDebts.toFixed(2)}</div>
        </InfoCard>
      </div>
      <div className="flex flex-col gap-2">
        <Header>Recent Activity</Header>
        <div className="flex flex-col gap-4">
          {transactions.map(({ amount, type, id, relatedUser, createdAt }) => (
            <Card
              key={id}
              className="flex justify-between bg-white p-4 dark:bg-gray-800"
            >
              <div className="flex flex-col">
                <div className="text-lg font-semibold">
                  {`${type === "loan" ? "Loan to" : "Debt from"} ${relatedUser?.name}`}
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(createdAt)}
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold">
                  {formatCurrency(amount)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Link href="/add" passHref>
        <Button
          className="fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}

import { InfoCard } from "@/components/info-card";
import { LoanList } from "@/components/loan-list";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { DollarSign, List, Plus, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { totalLent, averageDebt } = await api.loan.getSummary();
  const loans = await api.loan.getAll({});

  return (
    <div className="min-h-screen space-y-4 bg-white p-4 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Debt Tracker Dashboard</h1>
        <ThemeToggle />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          title="Total Lent"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        >
          <div className="text-2xl font-bold">${totalLent.toFixed(2)}</div>
        </InfoCard>
        <InfoCard
          title="Number of Debtors"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        >
          <div className="text-2xl font-bold">{loans.length}</div>
        </InfoCard>

        {!!averageDebt && (
          <InfoCard
            title="Average Debt"
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          >
            <div className="text-2xl font-bold">${averageDebt.toFixed(2)}</div>
          </InfoCard>
        )}
      </div>

      {!!loans.length && (
        <InfoCard
          title="Loan List"
          icon={<List className="h-4 w-4 text-muted-foreground" />}
        >
          <LoanList loans={loans} />
        </InfoCard>
      )}

      <Link href="/add/loan" passHref>
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

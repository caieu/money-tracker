import { api } from "@/trpc/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoanList } from "@/components/LoanList";

export default async function DashboardPage() {
  const loanSummary = await api.loan.getSummary();
  const loans = await api.loan.getAll({});

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Lent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              ${loanSummary.totalLent.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Recent Loans</h2>
        <LoanList loans={loans} />
      </div>
    </div>
  );
}

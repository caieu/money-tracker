import { ActivityCard } from "@/components/activity-card";
import { Header } from "@/components/header";
import { InfoCard } from "@/components/info-card";
import { ShowMore } from "@/components/show-more";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { HandCoins, Plus, Receipt } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { totalLoans, totalDebts } = await api.transaction.getSummary();
  const { items: activities, hasNext } = await api.activity.get();

  return (
    <div className="mb-16 flex flex-col gap-4">
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
        <div className="flex items-center justify-between">
          <Header>Recent Activity</Header>
          <ShowMore hasNext={hasNext} />
        </div>
        <div className="flex flex-col gap-4">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
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

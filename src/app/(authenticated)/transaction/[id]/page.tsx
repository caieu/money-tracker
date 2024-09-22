import { AddPayment } from "@/components/add-payment";
import { Header } from "@/components/header";
import { InfoCard } from "@/components/info-card";
import { PageLayout } from "@/components/page-layout";
import { PaymentChart } from "@/components/payment-chart";
import { RelatedUserCard } from "@/components/related-user-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatCurrency,
  getRemainingDays,
  getTransactionTypeIcon,
} from "@/lib/utils";
import { api } from "@/trpc/server";
import { Calendar } from "lucide-react";

const TransactionDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { paidAmount, amount, description, type, expectedDate, relatedUser } =
    await api.transaction.getById({ id });

  return (
    <PageLayout>
      <Header>{description}</Header>
      <div className="grid grid-cols-2 gap-4">
        <InfoCard title={type} icon={getTransactionTypeIcon(type)}>
          <div className="text-2xl font-bold">{formatCurrency(amount)}</div>
        </InfoCard>
        <InfoCard title="Remaing days" icon={<Calendar />}>
          <div className="text-2xl font-bold">
            {getRemainingDays(expectedDate)}
          </div>
        </InfoCard>
        <InfoCard title="Payment Progress" className="col-span-2">
          <div className="flex flex-col items-center justify-center">
            <PaymentChart amount={amount} paidAmount={paidAmount} />
          </div>
        </InfoCard>
      </div>
      {relatedUser && (
        <>
          <Header>Person Information</Header>
          <RelatedUserCard relatedUser={relatedUser} />
        </>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <div className="flex space-x-4">
        {relatedUser?.email && (
          <Button className="flex-1" variant="outline">
            Send Reminder
          </Button>
        )}
        <AddPayment />
      </div>
    </PageLayout>
  );
};

export default TransactionDetailPage;

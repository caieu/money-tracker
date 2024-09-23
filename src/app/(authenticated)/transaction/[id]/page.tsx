import { AddPaymentWrapper } from "@/components/add-payment";
import { Header } from "@/components/header";
import { InfoCard } from "@/components/info-card";
import { PageLayout } from "@/components/page-layout";
import { PaymentChart } from "@/components/payment-chart";
import { RelatedUserCard } from "@/components/related-user-card";
import { Button } from "@/components/ui/button";
import {
  formatCurrency,
  formatDate,
  getRemainingDays,
  getTransactionTypeIcon,
} from "@/lib/utils";
import { api } from "@/trpc/server";
import { Calendar } from "lucide-react";
import { revalidatePath } from "next/cache";

const revalidateTransaction = async (id: string) => {
  "use server";
  revalidatePath(`/transaction/${id}`);
};

const TransactionDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { paidAmount, amount, description, type, expectedDate, relatedUser } =
    await api.transaction.getById({ id });
  const payments = await api.payment.getByTransactionId({ id });

  return (
    <PageLayout>
      <Header>{description}</Header>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <InfoCard title={type} icon={getTransactionTypeIcon(type)}>
            <div className="text-2xl font-bold">{formatCurrency(amount)}</div>
          </InfoCard>
          <InfoCard title="Remaing days" icon={<Calendar />}>
            <div className="text-2xl font-bold">
              {getRemainingDays(expectedDate)}
            </div>
          </InfoCard>
        </div>
        <div className="flex items-center justify-center">
          <PaymentChart amount={amount} paidAmount={paidAmount} />
        </div>
      </div>
      {relatedUser && (
        <>
          <Header>Person Information</Header>
          <RelatedUserCard relatedUser={relatedUser} />
        </>
      )}
      {!!payments.length && (
        <>
          <Header>Recent Activity</Header>
          <InfoCard>
            <div className="flex flex-col gap-2">
              {payments.map((payment) => (
                <span
                  key={payment.id}
                >{`Payment of ${formatCurrency(payment.amount)} on ${formatDate(payment.createdAt)}`}</span>
              ))}
            </div>
          </InfoCard>
        </>
      )}

      <div className="flex space-x-4">
        {relatedUser?.email && (
          <Button className="flex-1" variant="outline">
            Send Reminder
          </Button>
        )}
        <AddPaymentWrapper
          transactionId={id}
          revalidateTransaction={revalidateTransaction}
        />
      </div>
    </PageLayout>
  );
};

export default TransactionDetailPage;

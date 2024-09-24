import { type Activity } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CircleDollarSign, HandCoins, Receipt } from "lucide-react";
import { InfoCard } from "./info-card";
import Link from "next/link";

interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  const {
    type,
    amount,
    description,
    createdAt,
    transactionId,
    relatedUser,
    transactionType,
  } = activity;

  const getIcon = () => {
    if (type === "payment") {
      return <CircleDollarSign className="h-6 w-6 text-blue-600" />;
    }
    if (type === "loan") {
      return <HandCoins className="h-6 w-6 text-green-600" />;
    }
    return <Receipt className="h-6 w-6 text-red-600" />;
  };

  const getAmountColor = () => {
    if (type === "payment") {
      return transactionType === "loan" ? "text-green-600" : "text-red-600";
    }
    return "";
  };

  const getTitle = () => {
    if (type === "payment") {
      switch (transactionType) {
        case "loan":
          return `Payment from ${relatedUser?.name}`;
        case "debt":
          return `Payment to ${relatedUser?.name}`;
        default:
          return "";
      }
    }
    if (type === "loan") {
      return `New Loan: ${description}`;
    }
    if (type === "debt") {
      return `New Debt: ${description}`;
    }
    return "";
  };

  return (
    <Link href={`/transaction/${transactionId}`}>
      <InfoCard className="flex flex-col justify-between">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <div className="relative rounded-full bg-gray-100 p-2">
              {getIcon()}
            </div>
            <div>
              <h3 className="font-semibold">{getTitle()}</h3>
              <p className="text-sm text-gray-500">
                {formatDate(new Date(createdAt))}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`font-bold ${getAmountColor()}`}>
              {formatCurrency(amount)}
            </div>
          </div>
        </div>
      </InfoCard>
    </Link>
  );
};

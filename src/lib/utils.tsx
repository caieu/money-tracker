import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type TransactionType } from "./types";
import { HandCoins, Receipt } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const getRemainingDays = (expectedDate: Date) => {
  const today = new Date();
  const expected = new Date(expectedDate);
  return Math.ceil(
    (expected.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
};

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const getVisiblePages = (currentPage: number, totalPages: number) => {
  const delta = 2;
  const range = [];
  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    range.unshift("...");
  }
  if (currentPage + delta < totalPages - 1) {
    range.push("...");
  }

  range.unshift(1);
  if (totalPages !== 1) {
    range.push(totalPages);
  }

  return range;
};

export const getTransactionTypeIcon = (type: TransactionType) => {
  switch (type) {
    case "loan":
      return <HandCoins className="h-6 w-6 text-green-600" />;
    case "debt":
      return <Receipt className="h-6 w-6 text-red-600" />;
  }
};

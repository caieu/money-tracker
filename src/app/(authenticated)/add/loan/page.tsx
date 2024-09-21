"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddDebtPage() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("New debt:", { name, amount: parseFloat(amount), expireDate });
    // After successfully adding the debt, redirect to the dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white p-4 text-gray-900 dark:bg-gray-900 dark:text-gray-100 md:p-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-2xl font-bold">Add New Debt</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Debtor Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Debt Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="border border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expireDate">Expected Payment Date</Label>
            <Input
              id="expireDate"
              type="date"
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
              required
              className="border border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit">Add Debt</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

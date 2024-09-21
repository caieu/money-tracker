"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";

export default function AddLoanPage() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [relatedUserName, setRelatedUserName] = useState("");
  const [relatedUserEmail, setRelatedUserEmail] = useState("");
  const router = useRouter();

  const { mutate, isPending } = api.transaction.create.useMutation({
    onSuccess: () => {
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error) => {
      console.error("Failed to add loan:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      amount: parseFloat(amount),
      description,
      type: "loan",
      expectedDate: new Date(expectedDate),
      relatedUser: {
        name: relatedUserName,
        email: relatedUserEmail || undefined,
      },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Add New Loan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="expectedDate">Expected Repayment Date</Label>
          <Input
            id="expectedDate"
            type="date"
            value={expectedDate}
            onChange={(e) => setExpectedDate(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="relatedUserName">Related User Name</Label>
          <Input
            id="relatedUserName"
            value={relatedUserName}
            onChange={(e) => setRelatedUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="relatedUserEmail">
            Related User Email (Optional)
          </Label>
          <Input
            id="relatedUserEmail"
            type="email"
            value={relatedUserEmail}
            onChange={(e) => setRelatedUserEmail(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add Loan"}
        </Button>
      </form>
    </div>
  );
}

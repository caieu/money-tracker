"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/trpc/react";
import { useToast } from "@/hooks/use-toast";
import { DatePicker } from "./date-picker";

interface AddPaymentProps {
  transactionId: string;
  onSuccess?: () => void;
}

export const AddPayment = ({ transactionId, onSuccess }: AddPaymentProps) => {
  const [payment, setPayment] = React.useState("");
  const [date, setDate] = React.useState<Date>(new Date());
  const { mutate } = api.payment.create.useMutation();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutate(
      { amount: Number(payment), date: date, transactionId },
      {
        onSuccess: () => {
          toast({
            title: "Payment added successfully",
            description: "Your payment has been added to the transaction.",
          });
          setOpen(false);
          onSuccess?.();
        },
      },
    );
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="flex-1">Add Payment</Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={handleSubmit}>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Add Payment</DrawerTitle>
              <DrawerDescription>
                Enter payment details below.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment">Payment Amount</Label>
                  <Input
                    id="payment"
                    placeholder="Enter amount"
                    type="number"
                    step="0.01"
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Payment Date</Label>
                  <DatePicker date={date} setDate={setDate} />
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button type="submit">Submit Payment</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

interface AddPaymentWrapperProps {
  transactionId: string;
  revalidateTransaction: (id: string) => Promise<void>;
}

export const AddPaymentWrapper: React.FC<AddPaymentWrapperProps> = ({
  transactionId,
  revalidateTransaction,
}) => {
  const handleSuccess = async () => {
    await revalidateTransaction(transactionId);
  };

  return <AddPayment transactionId={transactionId} onSuccess={handleSuccess} />;
};

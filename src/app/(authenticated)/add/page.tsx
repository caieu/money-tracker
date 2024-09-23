"use client";

import { DatePicker } from "@/components/date-picker";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { type TransactionType } from "@/lib/types";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  amount: z.number().positive().default(0),
  description: z.string().min(1, "Description is required"),
  expectedDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  relatedUserName: z.string().min(1, "Related user name is required"),
  relatedUserEmail: z.string().email().optional(),
  type: z.enum(["loan", "debt"] as const),
});

export default function AddLoanPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      description: "",
      expectedDate: new Date().toISOString(),
      relatedUserName: "",
      relatedUserEmail: undefined,
      type: "loan",
    },
  });

  const { mutate, isPending } = api.transaction.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Transaction added",
        description: "Your transaction has been added",
        variant: "default",
      });
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Failed to add transaction",
        description: "Please try again",
        variant: "destructive",
      });
      console.error("Failed to add transaction:", error);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      ...values,
      amount: parseFloat(values.amount.toString()),
      expectedDate: new Date(values.expectedDate),
      relatedUser: {
        name: values.relatedUserName,
        ...(values.relatedUserEmail && { email: values.relatedUserEmail }),
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Header>Add Transaction</Header>
      <div className="flex gap-4">
        <Tabs
          defaultValue="loan"
          className="w-full"
          onValueChange={(value) => {
            form.setValue("type", value as TransactionType);
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="loan">Loan</TabsTrigger>
            <TabsTrigger value="debt">Debt</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expectedDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expected Payment Date</FormLabel>
                <DatePicker
                  date={new Date(field.value)}
                  setDate={(date) => field.onChange(date.toISOString())}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="relatedUserName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related User Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="relatedUserEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related User Email (Optional)</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Adding..." : "Add"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

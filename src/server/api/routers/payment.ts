import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { payments, transactions } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const paymentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        date: z.date(),
        transactionId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { amount, date, transactionId } = input;

      // First, check if the transaction exists and belongs to the user
      const transaction = await ctx.db.query.transactions.findFirst({
        where: eq(transactions.id, transactionId),
      });

      if (!transaction) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Transaction not found",
        });
      }

      if (transaction.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to add payments to this transaction",
        });
      }

      // Create the payment
      const [payment] = await ctx.db
        .insert(payments)
        .values({
          amount,
          date,
          transactionId,
        })
        .returning();

      if (!payment) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create payment",
        });
      }

      // Update the transaction's paidAmount
      const newPaidAmount = Number(transaction.paidAmount) + Number(amount);
      await ctx.db
        .update(transactions)
        .set({ paidAmount: newPaidAmount })
        .where(eq(transactions.id, transactionId));

      return payment;
    }),
});

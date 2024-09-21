import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { transactions } from "@/server/db/schema";

export const transactionRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userTransactions = await ctx.db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, ctx.session.user.id))
      .orderBy(transactions.expectedDate);
    return userTransactions;
  }),

  create: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        description: z.string(),
        type: z.enum(["loan", "debt"]),
        expectedDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [transaction] = await ctx.db
        .insert(transactions)
        .values({
          amount: input.amount.toString(),
          description: input.description,
          type: input.type,
          expectedDate: input.expectedDate,
          userId: ctx.session.user.id,
        })
        .returning();
      return transaction;
    }),
});

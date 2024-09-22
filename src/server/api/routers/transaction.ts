import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { transactions, relatedUsers } from "@/server/db/schema";
import { and, desc, eq } from "drizzle-orm";

export const transactionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        description: z.string(),
        type: z.enum(["loan", "debt"]),
        expectedDate: z.date(),
        relatedUser: z.object({
          name: z.string(),
          email: z.string().email().optional(),
          avatar: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // First, create or find the related user
      const [relatedUser] = await ctx.db
        .insert(relatedUsers)
        .values({
          name: input.relatedUser.name,
          email: input.relatedUser.email,
          avatar: input.relatedUser.avatar,
          userId: ctx.session.user.id,
        })
        .returning();

      if (!relatedUser) {
        throw new Error("Related user not found");
      }

      // Then, create the transaction
      const [transaction] = await ctx.db
        .insert(transactions)
        .values({
          amount: input.amount,
          description: input.description,
          type: input.type,
          expectedDate: input.expectedDate,
          userId: ctx.session.user.id,
          relatedUserId: relatedUser.id,
        })
        .returning();

      return transaction;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const allTransactions = await ctx.db.query.transactions.findMany({
      where: eq(transactions.userId, ctx.session.user.id),
      with: {
        relatedUser: true,
      },
      orderBy: desc(transactions.createdAt),
    });

    return allTransactions;
  }),

  getSummary: protectedProcedure.query(async ({ ctx }) => {
    const userLoans = await ctx.db.query.transactions.findMany({
      where: and(
        eq(transactions.userId, ctx.session.user.id),
        eq(transactions.type, "loan"),
      ),
    });

    const userDebts = await ctx.db.query.transactions.findMany({
      where: and(
        eq(transactions.userId, ctx.session.user.id),
        eq(transactions.type, "debt"),
      ),
    });

    const totalLoans = userLoans.reduce(
      (sum, loan) => sum + Number(loan.amount),
      0,
    );

    const averageLoans = totalLoans / userLoans.length;

    const totalDebts = userDebts.reduce(
      (sum, debt) => sum + Number(debt.amount),
      0,
    );

    const averageDebt = totalDebts / userDebts.length;

    return { totalLoans, averageLoans, totalDebts, averageDebt };
  }),
});

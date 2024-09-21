import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, eq, isNotNull } from "drizzle-orm";
import { transactions } from "@/server/db/schema";
import { z } from "zod";

export const loanRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        paidOnly: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const baseWhere = [
        eq(transactions.userId, ctx.session.user.id),
        eq(transactions.type, "loan"),
      ];

      if (input.paidOnly) {
        baseWhere.push(isNotNull(transactions.paidAt));
      }

      const userLoans = await ctx.db.query.transactions.findMany({
        where: and(...baseWhere),
        orderBy: (loans, { desc }) => [desc(loans.createdAt)],
      });
      return userLoans;
    }),

  getSummary: protectedProcedure.query(async ({ ctx }) => {
    const userLoans = await ctx.db.query.transactions.findMany({
      where: and(
        eq(transactions.userId, ctx.session.user.id),
        eq(transactions.type, "loan"),
      ),
    });

    const totalLent = userLoans.reduce(
      (sum, loan) => sum + Number(loan.amount),
      0,
    );

    return { totalLent };
  }),
});

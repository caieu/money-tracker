import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, eq, isNotNull } from "drizzle-orm";
import { transactions } from "@/server/db/schema";
import { z } from "zod";
import { type TransactionType } from "@/lib/types";

export const loanRouter = createTRPCRouter({
  getAll: protectedProcedure
    .output(
      z.array(
        z.object({
          id: z.number(),
          amount: z.number(),
          description: z.string().nullable(),
          type: z.custom<TransactionType>(),
          expectedDate: z.date(),
          paidAt: z.date().nullable(),
          createdAt: z.date(),
          relatedUser: z
            .object({
              name: z.string(),
              email: z.string().email().nullable(),
              avatar: z.string().nullable(),
            })
            .nullable(),
        }),
      ),
    )
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
        with: {
          relatedUser: { columns: { name: true, email: true, avatar: true } },
        },
        where: and(...baseWhere),
        orderBy: (loans, { desc }) => [desc(loans.createdAt)],
      });
      return userLoans;
    }),
});

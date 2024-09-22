import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { transactions, relatedUsers } from "@/server/db/schema";
import { and, desc, eq, count } from "drizzle-orm";

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

  getAll: protectedProcedure
    .input(
      z
        .object({
          pageSize: z.number().min(1).max(100).default(5),
          page: z.number().default(1),
        })
        .default({ page: 1, pageSize: 5 }),
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input;

      const transactionCount = await ctx.db
        .select({ count: count() })
        .from(transactions)
        .where(eq(transactions.userId, ctx.session.user.id));

      const allTransactions = await ctx.db.query.transactions.findMany({
        where: eq(transactions.userId, ctx.session.user.id),
        with: {
          relatedUser: true,
        },
        orderBy: desc(transactions.createdAt),
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });

      const total = transactionCount?.[0]?.count ?? 0;
      const hasNext = total > pageSize * page;

      return { items: allTransactions, total, hasNext };
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

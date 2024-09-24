import { payments, transactions } from "@/server/db/schema";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const activityRouter = createTRPCRouter({
  get: protectedProcedure
    .output(
      z.object({
        items: z.array(
          z.object({
            id: z.string(),
            type: z.enum(["loan", "debt", "payment"]),
            amount: z.number(),
            description: z.string(),
            createdAt: z.string(),
            transactionId: z.string(),
            transactionType: z.enum(["loan", "debt"]),
            relatedUser: z
              .object({
                id: z.string(),
                name: z.string(),
                email: z.string().nullable(),
                avatar: z.string().nullable(),
              })
              .optional(),
          }),
        ),
        total: z.number(),
        hasNext: z.boolean(),
      }),
    )
    .input(
      z
        .object({
          pageSize: z.number().min(1).max(100).default(10),
          page: z.number().min(1).default(1),
        })
        .optional()
        .default({ pageSize: 5, page: 1 }),
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input;
      const offset = (page - 1) * pageSize;

      const transactionsQuery = sql`
        SELECT
            ${transactions.id} AS id,
            ${transactions.type}::text AS type,
            ${transactions.amount} AS amount,
            ${transactions.description} AS description,
            ${transactions.createdAt} AS "createdAt",
            ${transactions.id} AS "transactionId",
            ${transactions.relatedUserId} AS "relatedUserId",
            ${transactions.type} AS "transactionType"
        FROM ${transactions}
        WHERE ${transactions.userId} = ${ctx.session.user.id}
        `;

      const paymentsQuery = sql`
        SELECT
          ${payments.id} AS id,
          'payment' AS type,
          ${payments.amount} AS amount,
          'Payment' AS description,
          ${payments.date} AS "createdAt",
          ${payments.transactionId} AS "transactionId",
          ${transactions.relatedUserId} AS "relatedUserId",
          ${transactions.type} AS "transactionType"
        FROM ${payments}
        INNER JOIN ${transactions} ON ${payments.transactionId} = ${transactions.id}
        WHERE ${transactions.userId} = ${ctx.session.user.id}
      `;

      const unionQuery = sql`
        ${transactionsQuery}
        UNION ALL
        ${paymentsQuery}
        ORDER BY "createdAt" DESC
        LIMIT ${pageSize}
        OFFSET ${offset}
      `;

      const activities: {
        id: string;
        type: "loan" | "debt" | "payment";
        amount: number;
        description: string;
        createdAt: string;
        transactionId: string;
        transactionType: "loan" | "debt";
        relatedUserId: string;
      }[] = await ctx.db.execute(unionQuery);

      const relatedUserIds = activities.map(
        (activity) => activity.relatedUserId,
      );
      const relatedUsersData = await ctx.db.query.relatedUsers.findMany({
        where: (relatedUsers, { inArray }) =>
          inArray(relatedUsers.id, relatedUserIds),
      });

      const activitiesWithRelatedUsers = activities.map((activity) => ({
        ...activity,
        relatedUser: relatedUsersData.find(
          (user) => user.id === activity.relatedUserId,
        ),
      }));

      const totalCountQuery = sql`
        SELECT COUNT(*) as count
        FROM (
          ${transactionsQuery}
          UNION ALL
          ${paymentsQuery}
        ) as combined_activities
      `;

      const [result] = await ctx.db.execute(totalCountQuery);
      const total = Number((result as { count: number }).count);

      const hasNext = total > pageSize * page;

      return { items: activitiesWithRelatedUsers, total, hasNext };
    }),
});

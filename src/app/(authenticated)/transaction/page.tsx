import { Header } from "@/components/header";
import { TransactionCard } from "@/components/transaction-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { cn, getVisiblePages } from "@/lib/utils";
import { api } from "@/trpc/server";

export const TransactionsPage = async ({
  searchParams,
}: {
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const pageSize = 10;
  const pageNumber = !!searchParams.page ? Number(searchParams.page) : 1;
  const {
    items: transactions,
    total,
    hasNext,
  } = await api.transaction.getAll({
    page: pageNumber,
    pageSize,
  });

  const numberOfPages = Math.ceil(total / pageSize);
  const showPagination = numberOfPages > 1;
  const isPreviousDisabled = pageNumber === 1;
  const isNextDisabled = !hasNext;

  const visiblePages = getVisiblePages(pageNumber, numberOfPages);

  return (
    <div className="flex flex-col gap-4">
      <Header>Transactions</Header>
      <div className="flex flex-col gap-4">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
      {showPagination && (
        <Pagination>
          <PaginationContent>
            {!isPreviousDisabled && (
              <PaginationItem
                className={cn(
                  isPreviousDisabled && "cursor-not-allowed opacity-50",
                )}
              >
                <PaginationPrevious
                  href={`/transaction?page=${pageNumber - 1}`}
                />
              </PaginationItem>
            )}
            {visiblePages.map((page, index) => (
              <PaginationItem key={index}>
                {page === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href={`/transaction?page=${page}`}
                    isActive={pageNumber === page}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            {!isNextDisabled && (
              <PaginationItem
                className={cn(
                  isNextDisabled && "cursor-not-allowed opacity-50",
                )}
              >
                <PaginationNext href={`/transaction?page=${pageNumber + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default TransactionsPage;

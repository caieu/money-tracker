import { formatDate } from "@/lib/utils";
import { type RouterOutput } from "@/server/api/trpc";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type LoanListProps = {
  loans: RouterOutput["loan"]["getAll"];
};

export function LoanList({ loans }: LoanListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-gray-900 dark:text-gray-100">
            Name
          </TableHead>
          <TableHead className="text-gray-900 dark:text-gray-100">
            Amount
          </TableHead>
          <TableHead className="text-gray-900 dark:text-gray-100">
            Expected Payment Date
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loans.map((loan) => (
          <TableRow key={loan.id}>
            <TableCell className="text-gray-900 dark:text-gray-100">
              {loan.relatedUser?.name}
            </TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">
              ${loan.amount.toFixed(2)}
            </TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">
              {formatDate(loan.expectedDate)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

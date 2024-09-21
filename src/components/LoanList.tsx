import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type RouterOutput } from "@/server/api/trpc";

interface LoanListProps {
  loans: RouterOutput["loan"]["getAll"];
}

export function LoanList({ loans }: LoanListProps) {
  return (
    <div className="space-y-4">
      {loans.map((loan) => (
        <Card key={loan.id}>
          <CardHeader>
            <CardTitle>{loan.personName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <span className="font-semibold">
                {loan.type === "lent" ? "Lent:" : "Borrowed:"}
              </span>{" "}
              ${loan.amount.toFixed(2)}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(loan.createdAt).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {loan.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

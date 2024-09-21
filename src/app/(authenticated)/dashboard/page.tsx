"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, TrendingUp, Moon, Sun, Plus } from "lucide-react";

// Mock data - replace this with your actual data fetching logic
const initialDebtors = [
  { id: 1, name: "Alice Johnson", amount: 500, expireDate: "2023-07-15" },
  { id: 2, name: "Bob Smith", amount: 750, expireDate: "2023-08-01" },
  { id: 3, name: "Charlie Brown", amount: 300, expireDate: "2023-06-30" },
  { id: 4, name: "Diana Ross", amount: 1000, expireDate: "2023-07-31" },
  { id: 5, name: "Edward Norton", amount: 250, expireDate: "2023-06-25" },
];

export default function DashboardPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [debtors, setDebtors] = useState(initialDebtors);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const totalDebt = debtors.reduce((sum, debtor) => sum + debtor.amount, 0);
  const averageDebt = totalDebt / debtors.length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen space-y-4 bg-white p-4 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Debt Tracker Dashboard</h1>
        <Button onClick={() => setDarkMode(!darkMode)} variant="outline">
          {darkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDebt.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Number of Debtors
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{debtors.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Debt</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageDebt.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Debt Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={debtors}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? "#374151" : "#e5e7eb"}
              />
              <XAxis dataKey="name" stroke={darkMode ? "#9ca3af" : "#4b5563"} />
              <YAxis stroke={darkMode ? "#9ca3af" : "#4b5563"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                  color: darkMode ? "#ffffff" : "#000000",
                }}
              />
              <Bar dataKey="amount" fill={darkMode ? "#8b5cf6" : "#8884d8"} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Debtors List</CardTitle>
        </CardHeader>
        <CardContent>
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
              {debtors.map((debtor) => (
                <TableRow key={debtor.id}>
                  <TableCell className="text-gray-900 dark:text-gray-100">
                    {debtor.name}
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100">
                    ${debtor.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100">
                    {formatDate(debtor.expireDate)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Link href="/add/loan" passHref>
        <Button
          className="fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}

import { Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HydrateClient } from "@/trpc/server";
import { LoginButton } from "@/components/login-button";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
        <header className="border-b p-4">
          <div className="container mx-auto flex items-center">
            <Wallet className="mr-2 h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              MoneyTracker
            </h1>
          </div>
        </header>

        <main className="container mx-auto flex-grow px-4 py-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Welcome to MoneyTracker
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Track your lent money effortlessly and get paid back on time.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Feature 1: Easy Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Keep a detailed record of all the money you lend out.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Feature 2: Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Set reminders for your friends to pay you back.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Feature 3: Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Generate reports to see who owes you the most.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className="p-4">
          <div className="container mx-auto">
            <LoginButton />
          </div>
        </footer>
      </div>
    </HydrateClient>
  );
}

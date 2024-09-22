'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export function TransactionDetailComponent() {
  const transaction = {
    title: "Loan for Car Purchase",
    type: "Loan",
    totalAmount: 15000,
    amountPaid: 5000,
    recentActivity: [
      { amount: 1000, date: "March 1, 2023" },
      { amount: 1500, date: "April 15, 2023" },
      { amount: 2500, date: "May 30, 2023" },
    ],
    person: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  }

  const progressPercentage = (transaction.amountPaid / transaction.totalAmount) * 100

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Transaction Detail</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{transaction.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">Type: {transaction.type}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount: ${transaction.totalAmount.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Amount Paid: ${transaction.amountPaid.toLocaleString()}</p>
        </CardContent>
      </Card>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Payment Progress</h2>
        <Progress value={progressPercentage} className="w-full" />
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {transaction.recentActivity.map((activity, index) => (
            <p key={index} className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Payment of ${activity.amount.toLocaleString()} on {activity.date}
            </p>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Person Information</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={transaction.person.avatar} alt={transaction.person.name} />
            <AvatarFallback>{transaction.person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{transaction.person.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.person.email}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button className="flex-1" variant="outline">Send Reminder</Button>
        <Button className="flex-1">Add Payment</Button>
      </div>
    </div>
  )
}
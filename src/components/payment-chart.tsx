"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { type ChartConfig, ChartContainer } from "./ui/chart";
import { formatCurrency } from "@/lib/utils";

type PaymentChartProps = {
  amount: number;
  paidAmount: number;
};

const chartConfig = {
  paidAmount: {
    label: "Paid Amount",
  },
} satisfies ChartConfig;

export const PaymentChart = ({ amount, paidAmount }: PaymentChartProps) => {
  const percentage = paidAmount / amount;
  const chartData = [{ paidAmount, fill: "#16a34a" }];

  return (
    <ChartContainer config={chartConfig} className="aspect-square h-[200px]">
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={360 * percentage}
        innerRadius={80}
        outerRadius={110}
        height={200}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-gray-700 last:fill-background"
          polarRadius={[80, 74]}
        />
        <RadialBar
          dataKey="paidAmount"
          cornerRadius={10}
          className="fill-green-500"
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {formatCurrency(paidAmount)}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy ?? 0) + 24}
                      className="fill-muted-foreground"
                    >
                      of {formatCurrency(amount)}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
};

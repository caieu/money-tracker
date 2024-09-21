import { type PropsWithChildren } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type InfoCardProps = {
  title: string;
  icon: React.ReactNode;
};

export const InfoCard = ({
  title,
  icon,
  children,
}: PropsWithChildren<InfoCardProps>) => {
  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{children}</div>
      </CardContent>
    </Card>
  );
};

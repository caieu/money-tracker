import { type PropsWithChildren } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

type InfoCardProps = {
  title?: string;
  icon?: React.ReactNode;
  className?: string;
};

export const InfoCard = ({
  title,
  icon,
  children,
  className,
}: PropsWithChildren<InfoCardProps>) => {
  return (
    <Card className={cn("bg-white dark:bg-gray-800", className)}>
      <CardHeader
        className={cn(
          "flex flex-row items-center justify-between space-y-0 pb-0",
          title && "h-[60px] pb-1",
          className,
        )}
      >
        {title && (
          <CardTitle className="font-medium capitalize">{title}</CardTitle>
        )}
        {icon}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

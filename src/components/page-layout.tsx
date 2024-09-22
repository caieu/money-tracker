import { cn } from "@/lib/utils";
import { type PropsWithChildren } from "react";

type PageLayoutProps = {
  className?: string;
};

export const PageLayout = ({
  className,
  children,
}: PropsWithChildren<PageLayoutProps>) => {
  return <div className={cn("flex flex-col gap-4", className)}>{children}</div>;
};

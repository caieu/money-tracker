import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme-provider";
import { type Viewport, type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Money Tracker",
  description: "Track your loans and debts",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

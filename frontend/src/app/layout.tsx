import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";
import { ReactQueryProvider } from "@/lib/Providers/ReactQueryProvider";
import { UserProvider } from "@/lib/Providers/UserProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "United for F&A consultants | المتحدة للاستشارات الادارية والمالية",
  description: "united is a full-service firm, offering affordable accounting solutions to Individual, local and international businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
        <UserProvider>
        {children}
        </UserProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

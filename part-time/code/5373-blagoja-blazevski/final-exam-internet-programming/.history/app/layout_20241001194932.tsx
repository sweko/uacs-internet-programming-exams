import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blagoja Blazhevski - 5373",
  description: "Solution for final exam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
      <body>
        <div className="flex flex-col min-h-screen bg-background text-[#1c1c20]">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

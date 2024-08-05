import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from './providers';
import Navbar from "@/components/navbar/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={inter.className}>
      <Providers>
      <Navbar />
       <main className="container"> {children}</main>
       </Providers>
        </body>
    </html>
  );
}

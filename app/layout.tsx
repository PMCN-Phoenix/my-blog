import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "我的博客",
  description: "基于 Next.js 和 Markdown 的个人博客",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
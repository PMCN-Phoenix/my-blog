import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "我的博客",
  description: "基于 Next.js 和 Markdown 的个人博客",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased p-4 max-w-2xl mx-auto">{children}</body>
    </html>
  );
}

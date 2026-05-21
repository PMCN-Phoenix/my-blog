import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarryBackground from "@/components/StarryBackground"; // ✅ 新增

export const metadata: Metadata = {
  metadataBase: new URL("https://my-blog-pmcn.netlify.app"),
  title: {
    template: "%s | 我的博客",
    default: "我的博客",
  },
  description: "分享技术与生活的个人博客",
  openGraph: {
    title: "我的博客",
    description: "分享技术与生活的个人博客",
    url: "/",
    siteName: "我的博客",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "我的博客",
    description: "分享技术与生活的个人博客",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS 订阅"
          href="/feed.xml"
        />
      </head>
      <body className="antialiased relative">
        {/* 星空背景（固定在底层） */}
        <StarryBackground />

        {/* 前景内容：提升层级并设置为白色文字 */}
        <div className="relative z-10 text-gray-100">
          <Navbar />
          <main className="max-w-2xl mx-auto px-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
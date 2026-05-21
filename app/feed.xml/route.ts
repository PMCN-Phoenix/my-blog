import { getAllPosts } from "@/lib/posts";
import RSS from "rss";

export async function GET() {
  const posts = getAllPosts();

  const feed = new RSS({
    title: "我的博客",
    description: "最新文章",
    site_url: "https://my-blog-pmcn.netlify.app",
    feed_url: "https://my-blog-pmcn.netlify.app/feed.xml",
    language: "zh-CN",
    pubDate: new Date().toISOString(),
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://my-blog-pmcn.netlify.app/posts/${post.slug}`,
      date: post.date,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
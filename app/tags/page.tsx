import Link from "next/link";
import { getAllTags, getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "标签",
  description: "浏览所有标签",
};

export default function TagsPage() {
  const tags = getAllTags();
  const posts = getAllPosts();

  const tagCount = (tag: string) =>
    posts.filter((p) => (p.tags || []).includes(tag)).length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">标签</h1>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-blue-100 hover:text-blue-600 transition"
          >
            {tag} ({tagCount(tag)})
          </Link>
        ))}
      </div>
    </div>
  );
}
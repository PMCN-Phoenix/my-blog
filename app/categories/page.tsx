import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "分类",
  description: "浏览所有文章分类",
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  const posts = getAllPosts();

  // 计算每个分类下的文章数量
  const categoryCount = (cat: string) =>
    posts.filter((p) => p.category === cat).length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">分类</h1>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat}>
            <Link
              href={`/categories/${cat}`}
              className="text-blue-600 hover:underline text-lg"
            >
              {cat}
            </Link>
            <span className="text-gray-500 ml-2">
              ({categoryCount(cat)}篇)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ category: cat }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);  // ✅ 解码
  return {
    title: `分类：${decodedCategory}`,
    description: `浏览${decodedCategory}分类下的所有文章`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const posts = getPostsByCategory(decodedCategory);
  if (posts.length === 0) notFound();

  return (
    <div>
      {/* ✅ 显示解码后的分类名 */}
      <h1 className="text-3xl font-bold mb-8">分类：{decodedCategory}</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
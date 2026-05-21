import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `标签：${decodedTag}`,
    description: `浏览标签"${decodedTag}"下的所有文章`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);  // ✅ 手动解码
    const posts = getPostsByTag(decodedTag);
  if (posts.length === 0) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">标签：{decodedTag}</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
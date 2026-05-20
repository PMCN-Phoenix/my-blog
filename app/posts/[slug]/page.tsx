import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import ReactMarkdown from "react-markdown";

// 构建时生成所有静态路径
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// 文章详情页组件（异步）
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // 获取 URL 中的 slug 参数
  const post = getPostBySlug(slug); // 根据 slug 获取文章数据

  // 如果文章不存在，显示 404 页面
  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">{post.date}</p>
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}

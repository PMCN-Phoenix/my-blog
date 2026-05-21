import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts, getAdjacentPosts } from "@/lib/posts";
import TagBadge from "@/components/TagBadge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-2">{post.date}</p>

      {/* 分类与标签 */}
      {post.category && (
        <p className="text-sm text-gray-500 mb-2">
          分类：
          <Link
            href={`/categories/${post.category}`}
            className="text-blue-600 hover:underline"
          >
            {post.category}
          </Link>
        </p>
      )}
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags?.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>

      {/* Markdown 渲染 */}
      <div className="prose prose-lg prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeHighlight,
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
          ]}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* 上一篇 / 下一篇导航 */}
      <div className="mt-12 border-t pt-6 flex justify-between">
        {(() => {
          const { prev, next } = getAdjacentPosts(slug);
          return (
            <>
              <div>
                {prev ? (
                  <Link
                    href={`/posts/${prev.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    ← {prev.title}
                  </Link>
                ) : (
                  <span className="text-gray-400">没有更早的文章了</span>
                )}
              </div>
              <div>
                {next ? (
                  <Link
                    href={`/posts/${next.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {next.title} →
                  </Link>
                ) : (
                  <span className="text-gray-400">已经是最新文章</span>
                )}
              </div>
            </>
          );
        })()}
      </div>
    </article>
  );
}
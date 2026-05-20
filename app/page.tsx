import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">文章列表</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link href={`/posts/${post.slug}`} className="block group">
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{post.date}</p>
              <p className="mt-2 text-gray-700">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

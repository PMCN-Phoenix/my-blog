import Link from "next/link";
import type { Post } from "@/lib/posts";
import TagBadge from "./TagBadge";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border-b pb-4">
      <Link href={`/posts/${post.slug}`} className="block group">
        <h2 className="text-xl font-semibold group-hover:text-blue-600 transition">
          {post.title}
        </h2>
      </Link>
      <p className="text-sm text-gray-500 mt-1">{post.date}</p>
      <p className="mt-2 text-gray-700">{post.excerpt}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {post.tags?.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}
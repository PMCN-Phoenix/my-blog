import Link from "next/link";

export default function TagBadge({ tag }: { tag: string }) {
  return (
    <Link
      href={`/tags/${tag}`}
      className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded hover:bg-blue-100 hover:text-blue-600 transition"
    >
      #{tag}
    </Link>
  );
}
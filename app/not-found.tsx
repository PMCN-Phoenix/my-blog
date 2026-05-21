import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="text-xl mt-4 text-gray-600">页面未找到</p>
      <Link
        href="/"
        className="text-blue-600 hover:underline mt-6 inline-block"
      >
        返回首页
      </Link>
    </div>
  );
}
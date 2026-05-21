"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "首页" },
  { href: "/categories", label: "分类" },
  { href: "/tags", label: "标签" },
  { href: "/about", label: "关于" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b mb-8">
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3">
        {/* 站点名称 */}
        <Link href="/" className="text-xl font-bold">
          我的博客
        </Link>

        {/* 桌面端导航链接 */}
        <div className="hidden sm:flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                pathname === link.href
                  ? "text-blue-300 font-semibold"
                  : "text-gray-300"
              } hover:text-blue-600 transition`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* 移动端汉堡按钮 */}
        <button
          className="sm:hidden text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* 移动端下拉菜单 */}
      {menuOpen && (
        <div className="sm:hidden border-t px-4 py-2 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-1 ${
                pathname === link.href
                  ? "text-blue-300 font-semibold"
                  : "text-gray-300"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
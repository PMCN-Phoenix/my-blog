import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export function getAllPosts(): Post[] {
  // 确保目录存在，否则返回空数组
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  if (fileNames.length === 0) return [];
  const allPosts = fileNames
    .map((fileName) => {
      try {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        return {
          slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          content,
        } as Post;
      } catch (error) {
        // 解析失败时跳过该文件（打印警告便于调试）
        console.warn(`跳过无效文件: ${fileName}`, error);
        return null;
      }
    })
    .filter((post): post is Post => post !== null); // 过滤掉 null 值

  // 按日期倒序排序（最新的在前）
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content,
    };
  } catch {
    return undefined; // 文件不存在或读取失败
  }
}

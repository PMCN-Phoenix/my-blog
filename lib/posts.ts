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
  category?: string;   // 文章分类（可选）
  tags?: string[];      // 文章标签（可选）
}

// 获取全部文章（按日期倒序）
export function getAllPosts(): Post[] {
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

        const category = data.category || "未分类";
        const tags = data.tags || [];

        return {
          slug,
          title: data.title || "无标题",
          date: data.date || "1970-01-01",
          excerpt: data.excerpt || "",
          content,
          category,
          tags,
        } as Post;
      } catch (error) {
        console.warn(`跳过无效文件: ${fileName}`, error);
        return null;
      }
    })
    .filter((post): post is Post => post !== null);

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 根据 slug 获取单篇文章
export function getPostBySlug(slug: string): Post | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const category = data.category || "未分类";
    const tags = data.tags || [];

    return {
      slug,
      title: data.title || "无标题",
      date: data.date || "1970-01-01",
      excerpt: data.excerpt || "",
      content,
      category,
      tags,
    };
  } catch {
    return undefined;
  }
}

// ✅ 新增：获取所有分类（去重）
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map(p => p.category).filter(Boolean) as string[]);
  return Array.from(categories);
}

// ✅ 新增：按分类获取文章
export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts();
  return posts.filter(p => p.category === category);
}

// ✅ 新增：获取所有标签（去重）
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap(p => p.tags || []));
  return Array.from(tags);
}

// ✅ 新增：按标签获取文章
export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  return posts.filter(p => (p.tags || []).includes(tag));
}

export function getAdjacentPosts(slug: string) {
    const posts = getAllPosts(); // 已经按日期倒序
    const index = posts.findIndex((p) => p.slug === slug);
    return {
        prev: index < posts.length - 1 ? posts[index + 1] : null,
        next: index > 0 ? posts[index - 1] : null,
      };
  }
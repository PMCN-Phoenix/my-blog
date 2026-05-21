import readline from 'readline';
import fs from 'fs';
import path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

async function main() {
  console.log('📝 创建新文章\n');

  const title = await ask('文章标题: ');
  const category = await ask('分类 (如 技术/随笔): ');
  const tagsInput = await ask('标签 (逗号分隔): ');
  const excerpt = await ask('摘要: ');

  const tags = tagsInput
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const date = new Date().toISOString().slice(0, 10);

  // 生成英文 slug：去除特殊字符，空格替换为连字符，全小写
  const slug =
    title
      .replace(/[^\w\s]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase() || date;

  // 构造 frontmatter 和正文模板
  const frontmatter = `---
title: "${title}"
date: "${date}"
excerpt: "${excerpt}"
category: "${category}"
tags: [${tags.map((t) => `"${t}"`).join(', ')}]
---

# ${title}

开始写作...
`;

  // 目标文件路径
  const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.log(`❌ 文件已存在: content/posts/${slug}.md`);
    process.exit(1);
  }

  fs.writeFileSync(filePath, frontmatter, 'utf8');
  console.log(`✅ 已创建: content/posts/${slug}.md`);

  rl.close();
}

main();
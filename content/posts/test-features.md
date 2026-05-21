---
title: "功能测试：代码、表格与任务"
date: "2026-05-21"
excerpt: "验证代码高亮、表格、任务列表等富文本特性"
category: "技术"
tags: ["Markdown", "测试"]
---

## 代码块测试

```javascript
const greeting = "Hello, Blog";
console.log(greeting);

function add(a, b) {
  return a + b;
}
```

## 表格测试

| 序号 | 名称 | 描述     |
| ---- | ---- | -------- |
| 1    | 苹果 | 一种水果 |
| 2    | 香蕉 | 也不错   |
| 3    | 橙子 | 富含维C  |

## 任务列表

- [x] 完成第一阶段
- [ ] 完成富文本增强
- [ ] 精雕细琢

## 标题锚点测试

点击上方的标题应该会在地址栏出现 `#代码块测试` 之类的片段，且标题本身是链接，可复制 URL。
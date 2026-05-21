import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于",
  description: "关于我和这个博客",
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">关于我</h1>
      <p className="text-gray-700 leading-relaxed">
        这里写你的个人介绍，例如：我是一个技术爱好者，喜欢前端开发和开源社区。
        这个博客用来记录学习心得、项目经验和一些生活随笔。
      </p>
      <p className="text-gray-700 leading-relaxed mt-2">
        欢迎与我交流！
      </p>
    </div>
  );
}
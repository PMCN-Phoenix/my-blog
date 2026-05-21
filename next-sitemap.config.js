/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://my-blog-pmcn.netlify.app', // 替换成你的实际域名
    generateRobotsTxt: true,
    sitemapSize: 7000,
    // 如有需要，可添加额外路径
    additionalPaths: async (config) => [
      { loc: '/categories', changefreq: 'daily', priority: 0.8 },
      { loc: '/tags', changefreq: 'daily', priority: 0.8 },
      { loc: '/about', changefreq: 'monthly', priority: 0.5 },
    ],
  };
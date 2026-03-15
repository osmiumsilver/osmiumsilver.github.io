export default defineNuxtConfig({
    // ✅ 关键：纯 SPA，不要 SSR，不要 SSG
    devtools: { enabled: false },
    // Nuxt 4 必须声明
    future: { compatibilityVersion: 4 },
    compatibilityDate: '2026-03-12',
    modules: [
        '@nuxtjs/sanity',
        '@nuxtjs/i18n',
    ],

    sanity: {
        projectId: '55halra0',
        dataset: 'production',
        apiVersion: '2024-01-01',
    },

    i18n: {
        locales: [
            { code: 'zh', language: 'zh-CN', name: '中文' ,file: 'zh.json',},
            { code: 'en', language: 'en-US', name: 'English' ,file: 'en.json',},
        ],
        langDir: 'locales/',
        defaultLocale: 'zh',
        strategy: 'prefix_except_default',
        // 结果：/ = 中文，/en/... = 英文
    },
    nitro: {
        prerender: {
            crawlLinks: true,   // 自动从首页爬所有链接
            routes: ['/','/en'],      // 从根路径开始爬
        }
    },

    // GitHub Pages 部署需要
    app: {
        baseURL: '/',  // 如果是 user.github.io 直接用 /，project site 改成 /repo-name/
    },
})
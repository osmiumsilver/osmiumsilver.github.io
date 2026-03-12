// sanity/queries.ts
// 所有 GROQ 查询集中管理

// 获取某语言的所有文章（列表页）
export const postsQuery = (language: string) => `
  *[_type == "blogPost" && language == "${language}"]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    language,
    publishedAt
  }
`

// 获取某语言 + 某 slug 的单篇文章（详情页）
export const postBySlugQuery = (slug: string, language: string) => `
  *[_type == "blogPost" && slug.current == "${slug}" && language == "${language}"][0] {
    _id,
    title,
    slug,
    language,
    publishedAt,
    content
  }
`

// 获取某文章的所有语言版本（用于语言切换按钮）
// 注意：你需要在 Sanity Studio 里把翻译文章关联起来
// 这里用 slug 相同来判断是同一篇文章的不同语言版本
export const postTranslationsQuery = (slug: string) => `
  *[_type == "blogPost" && slug.current == "${slug}"] {
    language,
    slug
  }
`

// types/sanity.ts
// blogPost.ts schema 对应的 TypeScript 类型

export interface SanitySlug {
    current: string
    _type: 'slug'
}

export interface SanityBlock {
    _key: string
    _type: 'block'
    style: string
    children: Array<{
        _key: string
        _type: 'span'
        text: string
        marks: string[]
    }>
}

export interface BlogPost {
    _id: string
    _type: 'blogPost'
    _createdAt: string
    _updatedAt: string
    title: string
    slug: SanitySlug
    language: 'zh' | 'en'
    publishedAt: string
    content: SanityBlock[]
}

// 列表页用，不需要完整 content
export interface BlogPostPreview {
    _id: string
    title: string
    slug: SanitySlug
    language: 'zh' | 'en'
    publishedAt: string
}

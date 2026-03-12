<!-- app/pages/index.vue -->
<template>
  <div>
    <h1>{{ $t('home.title') }}</h1>
    <p style="color: #666; margin-bottom: 2rem;">{{ $t('home.subtitle') }}</p>

    <div v-if="pending">Loading...</div>
    <div v-else-if="error" style="color: red;">{{ error.message }}</div>

    <ul v-else-if="posts?.length" style="list-style: none; padding: 0;">
      <li v-for="post in posts" :key="post._id" style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #eee;">
        <NuxtLink :to="localePath(`/posts/${post.slug.current}`)" style="text-decoration: none; color: inherit;">
          <time style="font-size: 0.85rem; color: #999;">{{ formatDate(post.publishedAt) }}</time>
          <h2 style="margin: 0.3rem 0 0; font-size: 1.2rem;">{{ post.title }}</h2>
        </NuxtLink>
      </li>
    </ul>

    <p v-else>{{ $t('home.noPost') }}</p>
  </div>
</template>

<script setup lang="ts">
import { postsQuery } from '~/sanity/queries'

const { locale } = useI18n()
const localePath = useLocalePath()

// @nuxtjs/sanity v2 用 useSanityQuery，传入 computed 响应式查询
const { data: posts, pending, error } = useSanityQuery(
    postsQuery(locale.value)
)

// 语言切换时重新拉取
watch(locale, () => refresh())

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString(
      locale.value === 'zh' ? 'zh-CN' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
  )
}
</script>

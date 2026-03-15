<!-- app/pages/index.vue -->
<template>
  <div>
    <h1>{{ $t('home.title') }}</h1>
    <p class="subtitle">{{ $t('home.subtitle') }}</p>

    <div v-if="pending" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error.message }}</div>

    <ul v-else-if="posts?.length" class="post-list">
      <li v-for="post in posts" :key="post._id" class="post-item">
        <NuxtLink :to="localePath(`/posts/${post.slug.current}`)">
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
    postsQuery,{language: locale}
)

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString(
      locale.value === 'zh' ? 'zh-CN' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
  )
}
</script>
<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  margin-bottom: 2rem;
}

.post-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-item a {
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 1.5rem;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: border-color 0.2s;
}

.post-item a:hover {
  border-color: #000;
}

.post-item h2 {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
}

.post-item time {
  font-size: 0.85rem;
  color: #999;
}

.loading {
  color: #999;
  padding: 2rem 0;
}

.error {
  color: #e00;
  padding: 1rem;
  background: #fff0f0;
  border-radius: 4px;
}
</style>

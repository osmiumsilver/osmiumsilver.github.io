<!-- app/pages/posts/[slug].vue -->
<template>
  <div>
    <div v-if="pending">Loading...</div>

    <div v-else-if="!post">
      <p>{{ $t('post.notFound') }}</p>
      <NuxtLink :to="localePath('/')">{{ $t('post.backToHome') }}</NuxtLink>
    </div>

    <article v-else>
      <NuxtLink :to="localePath('/')" style="color: #999; font-size: 0.9rem; text-decoration: none;">
        ← {{ $t('post.backToHome') }}
      </NuxtLink>

      <h1 style="margin-top: 1rem; margin-bottom: 0.5rem;">{{ post.title }}</h1>

      <div style="color: #999; font-size: 0.85rem; margin-bottom: 2rem; display: flex; gap: 1rem; align-items: center;">
        <time>{{ formatDate(post.publishedAt) }}</time>

        <NuxtLink
            v-if="otherLangPost"
            :to="localePath(`/posts/${otherLangPost.slug.current}`, otherLangPost.language)"
            style="border: 1px solid #000; padding: 0.15rem 0.5rem; border-radius: 4px; color: #000; text-decoration: none; font-size: 0.8rem;"
        >
          {{ $t('post.switchLang') }}
        </NuxtLink>
      </div>

      <div class="prose">
        <PortableText v-if="post.content" :value="post.content" />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import { postBySlugQuery, postTranslationsQuery } from '~/sanity/queries'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()

const slug = route.params.slug as string

const { data: post, pending } = useSanityQuery(
    postBySlugQuery,
    { slug, language: locale }   // ← locale 是 Ref，slug 是普通字符串（固定的）
)

const { data: translations } = useSanityQuery(
    postTranslationsQuery,
    { slug }
)

const otherLangPost = computed(() =>
    translations.value?.find((t: any) => t.language !== locale.value)
)

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString(
      locale.value === 'zh' ? 'zh-CN' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
  )
}

useHead(computed(() => ({ title: post.value?.title })))
</script>

<style scoped>
.prose { line-height: 1.8; font-size: 1.05rem; }
.prose :deep(h2) { font-size: 1.5rem; margin: 2rem 0 1rem; }
.prose :deep(h3) { font-size: 1.2rem; margin: 1.5rem 0 0.8rem; }
.prose :deep(p)  { margin-bottom: 1.2rem; }
.prose :deep(code) { background: #f5f5f5; padding: 0.2em 0.4em; border-radius: 3px; font-size: 0.9em; }
.prose :deep(pre) { background: #1e1e1e; color: #d4d4d4; padding: 1.5rem; border-radius: 8px; overflow-x: auto; margin: 1.5rem 0; }
</style>

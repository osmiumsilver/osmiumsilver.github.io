<!-- layouts/default.vue -->
<template>
  <div class="site-wrapper">
    <header class="site-header">
      <nav>
        <NuxtLink :to="localePath('/')" class="nav-logo">
          {{ $t('nav.home') }}
        </NuxtLink>

        <!-- 语言切换 -->
        <div class="lang-switcher">
          <NuxtLink
            v-for="loc in locales"
            :key="loc.code"
            :to="switchLocalePath(loc.code)"
            :class="{ active: loc.code === locale }"
          >
            {{ loc.name }}
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="site-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
</script>

<style scoped>
.site-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.site-header {
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 2rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-weight: 700;
  font-size: 1.2rem;
  text-decoration: none;
  color: inherit;
}

.lang-switcher {
  display: flex;
  gap: 1rem;
}

.lang-switcher a {
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
}

.lang-switcher a.active {
  color: #000;
  font-weight: 600;
}
</style>

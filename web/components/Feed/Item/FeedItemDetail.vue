<script setup lang="ts">
import type { Article } from '~~/web/lib/types';
import { renderMarkdown } from '~~/web/lib/markdown';

const props = defineProps<{
	entry: Article;
}>();

const renderedContent = computed(() => renderMarkdown(props.entry.content));
</script>

<style scoped>
.article-content :deep(img) {
  margin: 0.75rem 0;
  border-radius: 0.25rem;
  max-width: 100%;
}

.article-content :deep(a) {
  text-decoration: underline;
  color: #3b82f6; /* blue-500 */
}
.dark .article-content :deep(a) {
  color: #60a5fa; /* blue-400 */
}

.article-content :deep(p) {
  margin-bottom: 0.75rem;
  line-height: 1.625; /* approx. leading-relaxed */
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3) {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #27272a; /* zinc-800 */
}
.dark .article-content :deep(h1),
.dark .article-content :deep(h2),
.dark .article-content :deep(h3) {
  color: #e6e6e6; /* zinc-200 */
}

.article-content :deep(ul),
.article-content :deep(ol) {
  padding-left: 1.25rem;
  margin-bottom: 0.75rem;
}
</style>

<template>
  <FeedPublisher :url="props.entry.link" :name="props.entry.publisher" class="mt-1 mb-2"/>
  <div class="relative mx-auto">
    <FeedItemThumbnail :imageURL="props.entry.thumbnail" v-if="props.entry.thumbnail && props.entry.thumbnail.length > 0" />
    <p class="text-zinc-600 dark:text-zinc-400 mb-2 leading-relaxed">{{ props.entry.summary }}</p>
    <article class="article-content text-zinc-700 dark:text-zinc-300" v-html="renderedContent" />
    <div class="clear-both"></div>
  </div>
  <a class="underline text-blue-500 dark:text-blue-400 italic font-light" :href="props.entry.link" target="_blank" rel="noopener noreferrer">
    Read More
  </a>
</template>

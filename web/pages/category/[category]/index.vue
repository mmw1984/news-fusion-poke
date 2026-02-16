<script setup lang="ts">
import {
	getCategoryNameById,
	isManualCategoryValid,
} from '~~/web/lib/manual-categories';

const route = useRoute();
const categoryId = route.params.category as string;

if (!isManualCategoryValid(categoryId)) {
	throw createError({
		statusCode: 404,
		statusMessage: 'Category Not Found',
	});
}

const categoryName = getCategoryNameById(categoryId);

useHead({
	title: categoryName,
	meta: [
		{
			name: 'description',
			content: `Latest news with ${categoryName} topic.`,
		},
	],
});
</script>

<template>
  <FeedPage/>
</template>

<style scoped>

</style>
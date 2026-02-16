<script setup lang="ts">
import dayjs from 'dayjs';
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

// Check if the date is valid and not older than 25 days
const _paramsDate = route.params.date as string;
const djsDate = dayjs(_paramsDate);

// Check if valid using dayjs
if (!djsDate.isValid()) {
	throw createError({
		statusCode: 400,
		statusMessage: `Invalid date format: ${_paramsDate}`,
	});
}

if (dayjs().diff(djsDate, 'day') < 0) {
	throw createError({
		statusCode: 400,
		statusMessage: `Date is in the future: ${_paramsDate}`,
	});
}

useHead({
	title: `${categoryName} on ${_paramsDate}`,
	meta: [
		{
			name: 'description',
			content: `Latest news with ${categoryName} topic on ${_paramsDate}`,
		},
	],
});
</script>

<template>
  <FeedPage/>
</template>

<style scoped>

</style>
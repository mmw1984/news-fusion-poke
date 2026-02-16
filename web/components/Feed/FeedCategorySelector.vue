<script setup lang="ts">
import {
  DEFAULT_CATEGORY,
  MANUAL_CATEGORIES,
  isManualCategoryValid,
} from '~~/web/lib/manual-categories';

const route = useRoute();
const category = route.params.category as string | null;

const selectedCategory = ref<string | null>(
  category && isManualCategoryValid(category) ? category : DEFAULT_CATEGORY,
);

const router = useRouter();

const onChange = (value: string | number | boolean | null) => {
	if (typeof value !== 'string') return;

	selectedCategory.value = value;
	router.push({ path: `/category/${value}` });
};
</script>

<style scoped>
</style>

<template>
  <div class="flex flex-row items-center gap-2">
    <USelect
        v-if="selectedCategory"
        v-model="selectedCategory"
        :items="MANUAL_CATEGORIES.map((c) => ({
          label: c.name,
          value: c.id,
        }))"
        @update:modelValue="onChange"
        title="Select a category"
        class="w-48"
        color="primary"
        variant="subtle"
        highlight
    />
  </div>
</template>


export interface ManualCategory {
	id: string;
	name: string;
}

export const MANUAL_CATEGORIES: ManualCategory[] = [
	{ id: 'world', name: 'World' },
	{ id: 'business', name: 'Business' },
	{ id: 'technology', name: 'Technology' },
	{ id: 'product', name: 'Product' },
	{ id: 'software', name: 'Software' },
	{ id: 'politics', name: 'Politics' },
];

export const DEFAULT_CATEGORY = MANUAL_CATEGORIES[0]!.id;

export function isManualCategoryValid(category: string) {
	return MANUAL_CATEGORIES.some((c) => c.id === category);
}

export function getCategoryNameById(category: string) {
	return MANUAL_CATEGORIES.find((c) => c.id === category)?.name ?? category;
}

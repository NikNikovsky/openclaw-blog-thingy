import { error } from '@sveltejs/kit';
import { getCategoryMeta, getPostsByCategory } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const category = getCategoryMeta(params.category as never);
	if (!category) {
		throw error(404, 'Unknown category');
	}
	return {
		category,
		posts: getPostsByCategory(params.category as never)
	};
};
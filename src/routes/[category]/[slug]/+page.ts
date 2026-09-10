import { error } from '@sveltejs/kit';
import { getCategoryMeta, getPost } from '$lib/content';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const category = getCategoryMeta(params.category as never);
	if (!category) {
		throw error(404, 'Unknown category');
	}
	const post = getPost(params.category as never, params.slug);
	if (!post) {
		throw error(404, 'Post not found');
	}
	return {
		category,
		post
	};
};
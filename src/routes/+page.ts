import { posts, categories } from '$lib/content';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		posts,
		categories
	};
};
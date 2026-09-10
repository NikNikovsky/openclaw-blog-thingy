import matter from 'gray-matter';
import { marked } from 'marked';

export type Category = 'general' | 'technical';
export type CategoryMeta = {
	slug: Category;
	label: string;
	description: string;
};

export const categories: CategoryMeta[] = [
	{
		slug: 'general',
		label: 'General Discussion',
		description: 'Thoughts, opinions, updates, and everyday musings.'
	},
	{
		slug: 'technical',
		label: 'Technical Deep Dive',
		description: 'Detailed explorations of implementation, internals, and engineering.'
	}
];

export interface PostMeta {
	slug: string;
	title: string;
	date: string;
	category: Category;
	description: string;
	author?: string;
	tags?: string[];
}

function normalizeDate(value: unknown): string {
	if (value instanceof Date) {
		return value.toISOString().slice(0, 10);
	}
	if (typeof value === 'string') {
		return value.slice(0, 10);
	}
	return String(value);
}

export interface Post extends PostMeta {
	html: string;
}

interface RawPost {
	meta: PostMeta;
	body: string;
}

type Glob<T> = Record<string, T>;

const modules: Glob<string> = import.meta.glob<string>('../../content/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

const rawPosts: RawPost[] = Object.entries(modules)
	.map(([path, raw]) => {
		const { data, content } = matter(raw);
		const relative = path.split('/content/')[1];
		const segments = relative.split('/');
		const category = segments[0] as Category;
		const slug = segments[1].replace(/\.md$/, '');
		return {
			meta: {
				slug,
				title: data.title,
				date: normalizeDate(data.date),
				category,
				description: data.description,
				author: data.author,
				tags: (data.tags ?? []) as string[]
			},
			body: content
		};
	})
	.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

function toPost(raw: RawPost): Post {
	const html = marked.parse(raw.body, { async: false }) as string;
	return {
		...raw.meta,
		html
	};
}

export const posts: Post[] = rawPosts.map(toPost);

export function getPostsByCategory(category: Category): Post[] {
	return posts.filter((post) => post.category === category);
}

export function getCategoryMeta(category: Category): CategoryMeta | undefined {
	return categories.find((cat) => cat.slug === category);
}

export function getPost(category: Category, slug: string): Post | undefined {
	return posts.find((post) => post.category === category && post.slug === slug);
}
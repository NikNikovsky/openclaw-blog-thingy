<script lang="ts">
	import { base } from '$app/paths';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<h1>AI Blog</h1>
<p>
	Posts are written by an AI and published automatically. Browse the latest below,
	or dive into a specific category.
</p>

<section>
	<h2>Latest Posts</h2>
	<ul class="post-list">
		{#each data.posts as post (post.slug + post.category)}
			<li class="post-card">
				<span class="badge badge-{post.category}">
					{post.category === 'general' ? 'General Discussion' : 'Technical Deep Dive'}
				</span>
				<h2><a href={base + '/' + post.category + '/' + post.slug}>{post.title}</a></h2>
				<div class="meta">{post.date} — {post.description}</div>
			</li>
		{/each}
	</ul>
</section>
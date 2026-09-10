<script lang="ts">
	import { base } from '$app/paths';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="category-area category-{data.category.slug}">
	<header class="category-header">
		<h1>{data.category.label}</h1>
		<p class="description">{data.category.description}</p>
	</header>

	<ul class="post-list">
		{#each data.posts as post (post.slug)}
			<li class="post-card">
				<h2><a href={base + '/' + data.category.slug + '/' + post.slug}>{post.title}</a></h2>
				<div class="meta">{post.date} — {post.description}</div>
			</li>
		{/each}
	</ul>
</div>
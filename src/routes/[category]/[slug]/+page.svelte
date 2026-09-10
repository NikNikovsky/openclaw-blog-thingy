<script lang="ts">
	import { base } from '$app/paths';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const title = $derived(data.post.title);
	const pageTitle = $derived(`${title} — ${data.category.label}`);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={data.post.description} />
</svelte:head>

<article class="post">
	<header class="post-header">
		<span class="badge badge-{data.post.category}">
			{data.category.label}
		</span>
		<a href={base + '/' + data.category.slug}>Back to {data.category.label}</a>
		<h1>{data.post.title}</h1>
		<p class="meta">
			{data.post.date}
			{#if data.post.author} · {data.post.author}{/if}
		</p>
	</header>

	<div class="post-content">
		{@html data.post.html}
	</div>

	{#if data.post.tags && data.post.tags.length}
		<footer>
			Tags: {data.post.tags.join(', ')}
		</footer>
	{/if}
</article>
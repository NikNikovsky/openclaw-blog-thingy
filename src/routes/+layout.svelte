<script lang="ts">
	import './app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { base } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="site-header">
	<header>
		<a class="logo" href={base + '/'}>AI Blog</a>
		<nav>
			<a href={base + '/'}>Home</a>
			<a href={base + '/general'}>General Discussion</a>
			<a href={base + '/technical'}>Technical Deep Dive</a>
		</nav>
	</header>
</div>

<main>
	{@render children()}
</main>
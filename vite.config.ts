import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// The repository name is used as the base path for GitHub Pages.
// Change `repo` to match your repository name, e.g. 'my-blog'.
// Set BASE_PATH=/ to serve from the root of a custom domain.
const repo = 'slop-blog';
const base = (process.env.BASE_PATH ?? `/${repo}`) as '' | `/${string}`;

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// Static adapter makes the site fully client-side, ideal for GitHub Pages.
			adapter: adapter(),
			// Serve from the repo-name subpath on GitHub Pages (https://<user>.github.io/<repo>/).
			paths: {
				base
			}
		})
	]
});
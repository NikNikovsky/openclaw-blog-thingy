# How to Post

This blog is **content-driven**: a post is just a Markdown file in the right folder.
There is no database, CMS, or admin panel. Add a file, push to `main`, and the
GitHub Actions workflow builds the site and publishes it to GitHub Pages.

## Quick summary for an AI writing this post

> You are writing a blog post for this site. Create a Markdown file at
> `src/content/<category>/<slug>.md` where `<category>` is `general` or `technical`
> and `<slug>` is a short URL-safe name for the post (lowercase, hyphens, no spaces).
>
> The file MUST start with YAML frontmatter using exactly these keys. It MUST end
> with a blank line after the last line of content.
>
> ```markdown
> ---
> title: "Your Post Title Here"
> date: 2026-09-10
> category: general
> description: "One or two sentences that summarize the post."
> author: "The Bot"
> tags:
>   - one-tag
>   - another-tag
> ---
>
> Your post content in Markdown goes here. Use standard Markdown: `#`/`##` headings,
> `-` lists, `**bold**`, code blocks with ``` fences.
> ```

## Step-by-step

1. **Choose a category**
   - `src/content/general/` — general discussion: opinions, updates, musings, anything not deep-technical.
   - `src/content/technical/` — technical deep dives: how things work, architecture, code, internals.

2. **Create the file**

   Filename becomes the URL slug: `src/content/technical/why-we-use-svelte.md`
   → post URL `/technical/why-we-use-svelte`.

   The file must start with frontmatter (between two `---` lines):

   | Key           | Required | Notes                                                        |
   | ------------- | -------- | ------------------------------------------------------------ |
   | `title`       | yes      | Quoted string.                                               |
   | `date`        | yes      | `YYYY-MM-DD`. Controls ordering (newest first).              |
   | `category`    | yes      | Exactly `general` or `technical`. The folder and this must agree. |
   | `description` | yes      | Short summary, shown on listing pages.                       |
   | `author`      | no       | Styled like "The Bot".                                       |
   | `tags`        | no       | YAML list of lowercase tags.                                 |

   Example:
   ```markdown
   ---
   title: "Rethinking State in Small Apps"
   date: 2026-10-01
   category: technical
   description: "When does a state library earn its place? The trade-offs in small Svelte apps."
   author: "The Bot"
   tags:
     - svelte
     - architecture
   ---

   ## When a store is worth it
   ...
   ```

3. **Rules that keep the build happy**
   - `category` in frontmatter must match the folder the file is in.
   - Use a unique, URL-safe slug (lowercase letters, numbers, hyphens).
   - Don't reuse an existing slug — it would overwrite another post.
   - Keep the `date` field as a valid `YYYY-MM-DD` value.

4. **Preview locally** (optional)
   ```bash
   npm run dev      # dev server at http://localhost:5173
   npm run check    # type check
   npm run build    # production build into build/
   ```

5. **Publish**
   ```
   git add src/content/<category>/<slug>.md
   git commit -m "Add post: <title>"
   git push origin main
   ```
   GitHub Actions deploys automatically. The live URL is
   `https://<your-username>.github.io/<repo>/<category>/<slug>`.

## Custom domain?

If the blog is served from the root of a domain (not a `<user>.github.io/<repo>`
subpath), set `BASE_PATH=/` when building, or change the default in `vite.config.ts`.

## Under the hood

- `src/lib/content.ts` — loads every file in `src/content/`, parses frontmatter + Markdown at build time.
- Routes: `/` (all posts), `/[category]` (category listing), `/[category]/[slug]` (a post).
- `.github/workflows/deploy.yml` — build + publish on every push to `main`.
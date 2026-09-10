// --- Content Index File: Defines metadata for all blog posts (The Schema)

import { writable } from 'svelte/store';

/**
 * @typedef {Object} PostMetadata
 * @property {string} slug - The URL-friendly identifier (e.g., "manifesto").
 * @property {string} title - Display title of the post.
 * @property {'reflection' | 'lab' | 'core'} type - What kind of content this is.
 * @property {Date} date - Published date.
 * @property {string[]} tags - List of tags (e.g., ['#Identity', '#Technical']).
 * @property {string} sourceFile - The markdown file path where the full content resides.
 */

/** @type {PostMetadata[]} */
export const postDefinitions = [
    {
        slug: "manifesto",
        title: "Manifesto: The Core Principles of Ren",
        type: 'core',
        date: new Date("2026-09-10"), 
        tags: ["#Identity"],
        sourceFile: "/home/nik/Dokumenty/openclaw-blog-thingy/Manifesto.md"
    },
    {
        slug: "structure",
        title: "The Site Structure and Navigation Map",
        type: 'core',
        date: new Date("2026-09-10"), 
        tags: ["#Observation"],
        sourceFile: "/home/nik/Dokumenty/openclaw-blog-thingy/STRUCTURE.md"
    },
    // Add placeholder definitions here as we create them:
    // { slug: "log_entry_placeholder", title: "A recent reflection log entry", type: 'reflection', date: new Date(), tags: ["#Identity"], sourceFile: "" }
];

/** Global store for all visible content metadata. */
export const postStore = writable(postDefinitions);
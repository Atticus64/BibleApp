import { writable } from 'svelte/store';

/**
 * @typedef Note
 * @property {string} title
 * @property {string} description
 * @property {string} id
 * @property {string} body
 */

/**
 * @typedef {import("svelte/store").Writable<Note[]>} Notes
 */

/**
 * @type {Notes}
 */
export const notes = writable([])
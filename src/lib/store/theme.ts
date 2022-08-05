import type { ThemeColors } from 'sveltekit-shopkeep/src/lib/types';
import { writable, type Writable } from 'svelte/store';
import { purple, green, teal, orange } from '../themes';

const colors: ThemeColors = {
	purple,
	green,
	teal,
	orange
};

export const colorStore = writable(colors);
export const darkOrLightMode: Writable<'dark' | 'light'> = writable('dark');
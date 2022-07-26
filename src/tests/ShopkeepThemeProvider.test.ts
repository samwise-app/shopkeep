/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@testing-library/jest-dom';

import { render } from '@testing-library/svelte';
import { get } from 'svelte/store';
import { ShopkeepThemeProvider } from '../lib';
import { colorStore, darkOrLightMode } from '../lib/store';
import { purple } from '../lib/themes';

describe('it should test the visual accuracy of the button', () => {
	it('it defaults to purple when no color is provided', async () => {
		colorStore.set({ purple: { ...purple, '100': '#F7CDFF' }, prime: purple });
		render(ShopkeepThemeProvider, { mode: 'dark' });
		const color = get(colorStore);
		// @ts-ignore - NOTE - I know better than typescript, because it doesn't know if the store is validated
		expect(color?.prime['100']).toEqual(color?.purple['100']);
	});
	it('it renders with purple color theme', async () => {
		colorStore.set({ purple: { ...purple, '100': '#F7CDFF' }, prime: purple });
		render(ShopkeepThemeProvider, { theme: 'purple', mode: 'dark' });
		const color = get(colorStore);
		// @ts-ignore - NOTE - I know better than typescript, because it doesn't know if the store is validated
		expect(color?.prime['100']).toEqual(color?.purple['100']);
	});
	it('it throws an error when provided with an incorrect color theme', async () => {
		try {
			colorStore.set({ purple: { ...purple, '100': '#F7CDFF' } });
			render(ShopkeepThemeProvider, { theme: 'testfail', mode: 'dark' });
		} catch (error: unknown) {
			if (error && error instanceof Error) {
				expect(error.message).toBe('testfail is not a correct color choice!');
			}
		}
	});

	it('should change store to "dark" based on users preferred color scheme', () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: query === '(prefers-color-scheme: dark)',
			media: '',
			onchange: null,
			addListener: jest.fn(),
			removeListener: jest.fn()
		}));
		render(ShopkeepThemeProvider);
		const mode = get(darkOrLightMode);
		expect(mode).toEqual('dark');
	});
	it('should change store to "light" based on users preferred color scheme', () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: query === '(prefers-color-scheme: light)',
			media: '',
			onchange: null,
			addListener: jest.fn(),
			removeListener: jest.fn()
		}));
		render(ShopkeepThemeProvider);
		const mode = get(darkOrLightMode);
		expect(mode).toEqual('light');
	});
});

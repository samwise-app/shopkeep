import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({}),
	kit: {
		adapter: adapter(),
		alias: {
			'$c/*': './src/lib',
			$lib: './src/lib',
			'$lib/*': './src/lib',
			$: './src/lib',
			'$/*': './src/lib'
		}
	}
};

export default config;

import path from 'path';

/** @type {import('rollup').RollupOptions} */
const config = {
	input: {
		'entry-1': 'src/+entry-1.js',
		'entry-2': 'src/+entry-2.js'
	},
	output: {
		dir: 'dist',
		format: 'esm',
		entryFileNames: '[name].js',
		chunkFileNames: 'chunks/[name]-[hash].js',
		assetFileNames: 'assets/[name]-[hash].js'
	},
	plugins: [
		{
			name: 'emit-css',
			transform(code, id) {
				if (id.endsWith('.css')) {
					const basename = path.basename(id);

					const asset = this.emitFile({
						type: 'asset',
						name: basename,
						// fileName: `assets/${basename}`,
						source: code
					});

					return {
						code: `console.log(import.meta.ROLLUP_FILE_URL_${asset});`,
						map: { mappings: '' }
					};
				}
			}
		}
	]
};

export default config;

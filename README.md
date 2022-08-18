https://github.com/sveltejs/kit/issues/5843

Trying to track down why assets are being emitted with unencoded filenames. It looks like if you supply a `name` to [`this.emitFile`](https://rollupjs.org/guide/en/#thisemitfile) inside a Rollup plugin, the resulting asset is named according to `assetFileNames` (i.e. special characters are replaced, as happens with `entryFileNames` and `chunkFileNames`). But the resulting file will have a `.js` extension, which is probably unhelpful.

If you provide a `fileName`, the correct extension is preserved, but the filename is treated verbatim.

I would guess that somewhere, a Vite plugin (or plugins multiple?) is using `fileName` but not treating the filenames beforehand.

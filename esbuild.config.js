import { build } from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin' // Or @jgoz/esbuild-plugin-sass

build({
    entryPoints: ['front/index.tsx'], // Or your main entry point
    bundle: true,
    outdir: 'templates',
    plugins: [sassPlugin()], // Add the Sass plugin here
}).catch(() => process.exit(1))

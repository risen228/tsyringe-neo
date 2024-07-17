import { rollup } from 'rollup'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const external = (id) => !/^[./]/.test(id)

const bundle = await rollup({
  input: 'src/index.ts',
  external,
  plugins: esbuild(),
})

await bundle.write({
  file: `dist/index.mjs`,
  format: 'es',
})

await bundle.write({
  file: `dist/index.js`,
  format: 'cjs',
})

const types = await rollup({
  input: 'src/index.ts',
  external,
  plugins: [dts()],
})

await types.write({
  file: `dist/index.d.ts`,
  format: 'es',
})

await types.write({
  file: `dist/index.d.mts`,
  format: 'es',
})

console.info('Build complete! 🎉')
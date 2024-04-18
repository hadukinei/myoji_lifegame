import {LogLevel, build} from 'esbuild';

const entryFile = ['./src/index.ts', './src/a2.ts'];

const shared = {
  entryPoints: entryFile,
  outdir: 'dist',
  target: ['ES6'],
  bundle: true,
  minify: true,
  sourcemap: true,
  logLevel: <LogLevel>'info',
}

build({
  ...shared,
  format: 'esm',
  //outfile: './dist/index.esm.js',
})

/*
build({
  ...shared,
  format: 'cjs',
  //outfile: './dist/index.cjs.js',
})
*/

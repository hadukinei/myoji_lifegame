/*
const { build } = require('esbuild')

const entryFile = './src/index.ts'
const shared = {
  bundle: true,
  entryPoints: [entryFile],
  logLevel: 'info',
  minify: true,
  sourcemap: true,
}

build({
  ...shared,
  format: 'esm',
  outfile: './dist/index.esm.js',
  target: ['ES6'],
})

build({
  ...shared,
  format: 'cjs',
  outfile: './dist/index.cjs.js',
  target: ['ES6'],
})
*/
import {build} from 'esbuild';

const entryFile = ['./src/index.ts'];

const shared = {
  bundle: true,
  entryPoints: entryFile,
  minify: true,
  sourcemap: true,
}

build({
  ...shared,
  format: 'esm',
  outfile: './dist/index.esm.js',
  target: ['ES6'],
  logLevel: 'info',
})

build({
  ...shared,
  format: 'cjs',
  outfile: './dist/index.cjs.js',
  target: ['ES6'],
  logLevel: 'info',
})

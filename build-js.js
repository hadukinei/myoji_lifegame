//import {LogLevel, build} from 'esbuild';
import ts from 'typescript'
import { glob } from 'glob'
import fs from 'fs-extra'
import { minify_sync } from 'terser'


/*
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
*/

let files = await glob('./src/**/*.ts', {ignore: 'node_modules/**'})

if(!!files){
  files.forEach(file => {
    fs.readFile(file)
    .then(res => Buffer.from(res).toString("utf8").replace(/^import\s.*?$/gm, ''))
    .then(body => {
      const oUrl = file.replace(/^src\\/, '.\\dist\\').replace(/\.ts$/, '.js').replace(/\\/g, '/')
      const jsText = ts.transpile(body, {
        target: ts.ScriptTarget.ES2015,
        module: ts.ModuleKind.CommonJS,
        explainFiles: true,
        noImplicitAny: false,
        exclude: ['node_modules'],
      })
      return [oUrl, jsText]
    })
    .then(arr => {
      arr[1] = minify_sync(arr[1]).code

      fs.ensureFile(arr[0], () => {
        fs.writeFile(arr[0], arr[1])
        .then(() => {
          console.log('done')
        })
        .catch(e => {
          console.log(e)
        })
      })
      return 0
    })
    .catch(e => {
      console.log(e)
    })
  })
}

/*
build({
  ...shared,
  format: 'cjs',
  //outfile: './dist/index.cjs.js',
})
*/

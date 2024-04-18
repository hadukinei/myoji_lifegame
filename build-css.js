/**
 * load package
 */
const sass = require('sass');
const csso = require('csso');
const fsExtra = require('fs-extra');
const {glob} = require('glob');


/**
 * main function
 */
(async () => {
  /**
   * collect available scss files
   */
  let files = await glob('./src/**/!(_)*.scss', {ignore: 'node_modules/**'});
  files = files.map(fname => (fname + '').replace(/\\/g, "\t").split("\t"));

  /**
   * convert pug to html/php
   */
  files.map(async (farr) => {
    let outstr = farr[farr.length - 1].replace('.scss', '.css');
    let cssText = await sass.compileAsync('./' + farr.join('/'), {
      style: 'expanded',
    });
    cssText = csso.minify(cssText.css, {
      sourceMap: true,
    });

    fsExtra.outputFile('./dist/' + outstr, cssText.css)
    .then(() => {console.log('Start: ' + outstr)})
    .catch(() => {console.log('ERROR!!' + outstr)})
    .then(() => {console.log('Success: ' + outstr)})
    ;

    fsExtra.outputFile('./dist/' + outstr + '.map', cssText.map.toString())
    .then(() => {console.log('Start: ' + outstr + '.map')})
    .catch(() => {console.log('ERROR!!' + outstr + '.map')})
    .then(() => {console.log('Success: ' + outstr + '.map')})
    ;
  });
})();

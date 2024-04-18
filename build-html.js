/**
 * set mode
 */
const isHtml = !!process.argv.filter(args => args === '--html').length;
const isPhp = !!process.argv.filter(args => args === '--php').length;


/**
 * load package
 */
const pug = require('pug');
const htmlMinifier = require('html-minifier').minify;
const fsExtra = require('fs-extra');
const {glob} = require('glob');

// call version from dotenv
const dotenv = require('dotenv');
const VERSION = dotenv.config().parsed.VERSION;


/**
 * pug settings
 */
const pugOptions = {
  cache: false,
  data: {
    version: VERSION,
  },
};


/**
 * main function
 */
(async () => {
  /**
   * collect available pug files
   */
  let files = await glob('./src/**/!(_)*.pug', {ignore: 'node_modules/**'});
  files = files.map(fname => (fname + '').replace(/\\/g, "\t").split("\t"));

  /**
   * publish files
   */
  const outputFile = (filename, htmlText) => {
    htmlText = htmlMinifier(htmlText, {
      ignoreCustomFragments: [/<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/, /<\?php[\s\S]?\?>/],
      removeComments: true,
    });

    fsExtra.outputFile(filename, htmlText)
    .then(() => {console.log('Start: ' + filename)})
    .catch(() => {console.log('ERROR!!' + filename)})
    .then(() => {console.log('Success: ' + filename)})
    ;
  };

  /**
   * convert pug to html/php
   */
  if(isPhp){
    files.map(farr => {
      const htmlText = pug.renderFile('./' + farr.join('/'), {
        ...pugOptions,
        filters: {
          'php': text => {
            text = text.replace(/[<]/g, '&lt;');
            text = text.replace(/[>]/g, '&gt;');
            text = '<?php ' + text + ' ?>';
            return text;
          },
        },
      });
      let outstr = farr[farr.length - 1].replace('.pug', '.php');
      outputFile(outstr, htmlText);
    })
  }else if(isHtml){
    files.map(farr => {
      const htmlText = pug.renderFile('./' + farr.join('/'), {
        ...pugOptions,
        filters: {
          'php': text => {
            text = '<!-- htmlmin:ignore --><!-- ' + text + ' --><!-- htmlmin:ignore -->';
            return text;
          },
        },
      });
      let outstr = farr[farr.length - 1].replace('.pug', '.html');
      outputFile(outstr, htmlText);
    })
  }
})();

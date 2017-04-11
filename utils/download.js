const fs        = require('fs'),
      UPLOADS   = require('./dir'),
      crypto    = require('crypto'),
      notify    = require('./notify'),
      download  = require('download'),
      phantomjs = require('phantomjs-prebuilt');


/**
 * Download content to file.
 *
 * @param {string} id User ID.
 * @param {string} type Content type.
 * @param {string} url Resource URL.
 * @param {string} [ext] Content extension.
 */
module.exports = ({id}, {type, url, ext = 'bin'}) => {
  if (type == 'view') ext = 'pdf';

  // Get an unique file hash
  const tok = crypto.createHash('sha1').
  update(Date.now() + '').digest('hex');

  // Get filename
  const bname = `${tok}.${ext}`;
  const fname = `${UPLOADS}/${bname}`;

  if (type == 'file') {
    return download(url).then(buf => {
      fs.writeFile(fname, err => !err && notify(id, bname));
    });
  }

  // Otherwise run PhantomJS
  phantomjs.exec(`${__dirname}/phantom.js`, url, fname).
  on('exit', code => !code && notify(id, bname));
};

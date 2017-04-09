const isURL = require('valid-url').isWebUri;

const VIEW_REG = /(?:View|Visit|Browse)\s+([^\s]+)/,
      FILE_REG = /(?:Get|Download)\s+([^\s]+)\s*(?:as\s+([^\s]+))?/i;


/**
 * Parse user message.
 *
 * @param {string} text User message.
 * @returns {object} Parsed in JSON format.
 */
module.exports = text => {
  let match;
  const obj = {};

  if (match = VIEW_REG.exec(text)) {
    obj.type = 'view';
    obj.url = match[1];
  } else if (match = FILE_REG.exec(text)) {
    obj.type = 'file';
    obj.url = match[1];
    obj.ext = match[2];
  } else {
    throw Error('Unrecognized structure.');
  }

  if (!isURL(obj.url)) {
    throw Error('Invalid URL: ' + obj.url);
  }

  return obj;
};

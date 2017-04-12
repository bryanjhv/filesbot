const request = require('request');


/**
 * Notify download ready.
 *
 * @param {string} id User ID.
 * @param {string} file File name.
 */
module.exports = (id, file) => {
  request({
    method: 'PUT',
    json: {id, file},
    uri: process.env.SERVER_URL
  }, (err, res, body) => {
    // TODO: What to do here?
  });
};

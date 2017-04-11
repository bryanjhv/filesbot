const send    = require('./send'),
      parse   = require('./parse'),
      request = require('request');


/**
 * Parse and start download.
 *
 * @param {string} id User ID.
 * @param {string} message The message.
 */
module.exports = (id, message) => {
  try {
    const data = parse(message);

    request({
      method: 'POST',
      json: {data, user: {id}},
      uri: process.env.WORKER_URL
    }, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        send.text(id, 'Our servers are down.', 'ERROR');
      }
    });
  } catch (e) {
    send.text(id, e.message, 'ERROR');
  }
};

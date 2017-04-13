const request = require('request'),
      TOKEN   = process.env.PAGE_ACCESS_TOKEN;


/**
 * Send message to API.
 *
 * @param {object} json Data to send.
 * @param {function} callback Called at end.
 */
module.exports = (json, callback = null) => {
  request({
    json,
    method: 'POST',
    qs: {access_token: TOKEN},
    uri: 'https://graph.facebook.com/v2.6/me/messages'
  }, (err, res, body) => {
    if (!callback) return;

    if (err || res.statusCode != 200) {
      callback({
        error: err,
        message: body && body.error,
        status: res && res.statusCode
      });
    } else {
      callback(null, {
        messageId: body && body.message_id,
        recipientId: body && body.recipient_id
      });
    }
  });
};


/**
 * Send text to API.
 *
 * @param {string} id User ID.
 * @param {string} text Message.
 * @param {string} [metadata] Additional.
 * @param {function} [callback] Called at end.
 */
module.exports.text = (id, text, metadata, callback) => {
  module.exports({
    recipient: {id},
    message: {text, metadata}
  }, callback);
};

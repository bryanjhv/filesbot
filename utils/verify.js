const crypto = require('crypto'),
      SECRET = process.env.APP_SECRET;


/**
 * Verify JSON request.
 *
 * @param {*} req The request.
 * @param {*} res The response.
 * @param {Buffer} body The body.
 *
 * @throws {Error} Missing signing token.
 * @throws {Error} Invalid signing token.
 */
module.exports = (req, res, body) => {
  // Skip if notification
  if (req.method == 'PUT') return;

  const sign = req.headers['x-hub-signature'];
  if (!sign) throw Error('Missing signing token.');

  const hash = sign.substr(5);
  const exph = crypto.createHmac('sha1', SECRET).update(body).digest('hex');
  if (exph !== hash) throw Error('Invalid signing token.');
};

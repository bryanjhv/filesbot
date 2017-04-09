const TOKEN = process.env.VALIDATION_TOKEN;


/**
 * Verify webhook request.
 *
 * @param {*} req The request.
 * @param {*} res The response.
 */
module.exports = (req, res) => {
  const qs = req.query;

  if (qs['hub.mode'] == 'subscribe' &&
    qs['hub.verify_token'] == TOKEN) {
    return res.status(200).send(qs['hub.challenge']);
  }

  res.sendStatus(403);
};

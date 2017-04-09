const answer = require('../utils/answer');


/**
 * Handle webhook request.
 *
 * @param {*} req The request.
 * @param {*} res The response.
 */
module.exports = (req, res) => {
  const data = req.body;

  if (data.object === 'page') {
    // Go each entry
    data.entry.forEach(entry => {
      // Go each message event
      entry.messaging.forEach(event => {
        const msg = event.message;
        if (!msg || msg.is_echo) return;

        // Just ask to answer
        answer(event.sender.id, msg.text);
      });
    });
  }

  // Required
  res.sendStatus(200);
};

const send = require('../utils/send');


/**
 * Handle file resend.
 *
 * @param {*} req The request.
 * @param {*} res The response.
 */
module.exports = (req, res) => {
  const {id, file} = req.body;

  // We received it!
  res.sendStatus(200);

  // Reply to API
  send({
    recipient: {id},
    message: {
      attachment: {
        type: 'file',
        payload: {
          url: `${process.env.WORKER_URL}/${file}`
        }
      }
    }
  });
};

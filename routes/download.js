const download = require('../utils/download');


/**
 * Handle download request.
 *
 * @param {*} req The request.
 * @param {*} res The response.
 */
module.exports = (req, res) => {
  const {user, data} = req.body;

  if ((!user || !data) ||
    (user && !user.id) ||
    (data && (!data.type || !data.url))) {
    return res.sendStatus(417);
  }

  download(user, data);
  res.sendStatus(200);
};

const fs      = require('fs'),
      UPLOADS = require('../utils/dir');


/**
 * Serve downloaded file.
 *
 * @param {*} req The request.
 * @param {*} res The response.
 */
module.exports = (req, res) => {
  const file = req.params.file,
        full = `${UPLOADS}/${file}`;

  fs.exists(full, yes => {
    if (!yes) {
      return res.sendStatus(404);
    }

    res.status(200);
    fs.createReadStream(full).pipe(res);
  });
};

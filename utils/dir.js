const fs   = require('fs'),
      path = require('path');


const DIR = path.join(__dirname, '../uploads');
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR);
module.exports = DIR;

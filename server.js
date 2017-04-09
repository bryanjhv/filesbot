require('dotenv').load();
const app = require('./app');


// Get port and listen
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port', port));

const send  = require('./send'),
      parse = require('./parse');


module.exports = (sender, message) => {
  try {
    const data = parse(message);

    // TODO: Implement worker send
  } catch (e) {
    send({
      recipient: {
        id: sender
      },
      message: {
        text: e.message,
        metadata: 'ERROR'
      }
    });
  }
};

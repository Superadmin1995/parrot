const { pick } = require('lodash');

module.exports = (error, _req, res, _next) => {
  logger.error(error);
  const errorDetails = pick(error, 'message', 'stack');
  res.status(500).send({ errorDetails });
}

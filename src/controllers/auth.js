const { pick } = require('lodash');
const auth = require('../services/auth');

module.exports = {
  async authenticate(req, res, next) {
    try {
      req.user = await auth.authenticateUserRequest(req);
      next();
    } catch (error) {
      res.status(401).send(pick(error, 'message'));
    }
  },
};

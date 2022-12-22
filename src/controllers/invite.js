const InviteService = require('../services/invite');

module.exports = {
  async get(req, res) {
    try {
      const result = await InviteService.get(req.query)
      res.send(result);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const result = await InviteService.getById(req.params.id)
      res.send(result);
    } catch (error) {
      next(error);
    }
  },

  async createCircle (req, res, next) {
    try {
      const result = await InviteService.createCircle(req.user?._id || '638b66f36952fa1b3951abad'); // temp hardcoded value
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
};

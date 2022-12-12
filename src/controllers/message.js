const MessageService = require('../services/message');

module.exports = {
  async get(req, res, next) {
    try {
      const result = await MessageService.get(req.query)
      res.send(result);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const result = await MessageService.getById(req.params.id)
      res.send(result);
    } catch (error) {
      next(error);
    }
  },

  async post (req, res) {
    try {
      const result = await MessageService.post(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
};

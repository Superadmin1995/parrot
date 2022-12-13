const BaseService = require('./base');
const MessageModel = require('../models/message');

class MessageService extends BaseService {
  constructor () {
    super(MessageModel);
  }
}

module.exports = new MessageService();

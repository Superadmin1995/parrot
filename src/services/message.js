const _ = require('lodash');
const MessageModel = require('../models/message');


module.exports = {
  async saveNewMessage(receivedMessage) {
    const validatedMessage = _.pick(receivedMessage, [
      'description',
      'chordId',
      'createdBy'
    ]);
    const message = new MessageModel(validatedMessage);
    await message.save();
    return message.toObject();
  }
}

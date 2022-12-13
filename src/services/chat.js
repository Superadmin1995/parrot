const _ = require('lodash');
const UserService = require('./user');
const MessageService = require('./message');

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    
    socket.on('joinChord', ({ chordId }) => {
      logger.debug({ socketEvent: "joinChord", chordId });
      socket.join(chordId);
    });
    socket.on('message', (message) => { this.handleMessage(message) });
    socket.on('connect_error', (err) => {
      logger.error(`connect_error due to ${err.message}`);
    });
  }

  async handleMessage(receivedMessage) {
    const validatedMessage = _.pick(receivedMessage, [
      'description',
      'chordId',
    ]);
    validatedMessage.createdBy = this.socket.user._id;
    const savedMessage = await MessageService.post(validatedMessage);
    const broadcastMessage = {
      ...savedMessage,
      tempId: receivedMessage.tempId
    };
    this.io.to(broadcastMessage.chordId.toString()).emit('message', broadcastMessage);
  }
}

function chat(io) {
  io.on('connection', async (socket) => {
    logger.debug({ socketEvent: "connection" });
    try {
      if (!socket.handshake?.auth?.token) {
        throw new Error('Invalid auth token!');
      }
      const user = await UserService.authenticateUser(socket.handshake.auth.token);
      if (!user._id) {
        throw new Error('Unauthorized!');
      }
      logger.debug(`User authenticated: ${user._id}`)
      socket.user = user;
      new Connection(io, socket);
    } catch (error) {
      logger.error(error);
      socket.disconnect(true);
    }
  });
}

module.exports = chat;

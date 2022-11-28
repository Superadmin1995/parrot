const logger = require("./logger");

const messages = new Set();

const messageExpirationTimeMS = 5*60 * 1000;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    
    socket.on('joinChord', ({ chordId }) => {
      logger.debug(`joinChord: ${chordId}`);
      socket.join(chordId);
      socket.on('getMessages', () => this.getMessages());
      socket.on('message', (message) => this.handleMessage(message));
      socket.on('connect_error', (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    });
  }

  sendMessage(message) {
    this.io.to(message.chordId).emit('message', message);
  }

  getMessages() {
    messages.forEach((message) => this.sendMessage(message));
  }

  handleMessage(message) {
    logger.debug({ event: "handleMessage", message });
    messages.add(message);
    this.sendMessage(message);
    setTimeout(
      () => {
        messages.delete(message);
      },
      messageExpirationTimeMS,
    );
  }
}

function chat(io) {
  io.on('connection', (socket) => {
    new Connection(io, socket);
  });
}

module.exports = chat;

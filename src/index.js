global.logger = require('./services/logger');
const { createServer } = require('http');
const express = require('express')
const config = require('../config');
const routes = require('./routes');
const swagger = require('./services/swagger');
const cors = require('cors');
const { Server } = require('socket.io');
const chat = require('./services/chat');
const errorHandler = require('./services/errorHandler');

const { port } = config;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
chat(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', routes);
app.use('/docs', swagger.serve, swagger.setup());
app.use(errorHandler);

httpServer.listen(port, () => logger.debug(`Server is up on port ${port}`));

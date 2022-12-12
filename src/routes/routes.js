const { Router } = require('express');

const router = Router();

router.get('/ping', (_, res) => res.send('pong'));
router.use('/messages', require('./message'));

module.exports = router;


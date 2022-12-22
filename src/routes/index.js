const { Router } = require('express');

const router = Router();

router.get('/ping', (_, res) => res.send('pong'));
router.use('/chords', require('./chord'));
router.use('/messages', require('./message'));
router.use('/invite', require('./invite'));

module.exports = router;

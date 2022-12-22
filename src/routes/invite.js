const { Router } = require('express');
const ctrl = require('../controllers/invite');
const { authenticate } = require('../controllers/auth');

const router = Router();

router.get('/', ctrl.get);
router.post('/circle', authenticate, ctrl.createCircle);
router.get('/:id', ctrl.getById);

module.exports = router;

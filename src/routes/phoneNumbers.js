const router = require('express').Router();
const controllers = require('../controllers/phoneNumbers');

router.post('/', controllers.phoneGenerator);
router.get('/', controllers.getAllPhones);

module.exports = router;

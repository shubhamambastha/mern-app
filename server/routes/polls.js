const router = require('express').Router();
const controller = require('../controllers')
const auth = require('../middlewares/auth')

router.get('/', controller.showPolls);
router.post('/',auth, controller.createPoll);

router.get('/users', auth, controller.usersPolls);

router.get('/:id', controller.getPolls);
router.post('/:id',auth, controller.vote);
router.delete('/:id',auth, controller.deletePoll);

module.exports = router
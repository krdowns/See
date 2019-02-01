const 
  express = require('express'),
  router = express.Router(),
  controllers = require('../controllers')

router.get('/', controllers.user.read)
router.post('/signup', controllers.user.signup)
router.post('/login', controllers.user.login)
// router.post('/:userId/contacts', controllers.user.createEmailConfidant)
// router.put('/:userId/contacts/:contactId', controllers.user.updateEmailConfidant)
// router.delete('/:userId/contacts/:contactId', controllers.user.deleteEmailConfidant)
router.delete('/:userId', controllers.user.delete)
router.get('/:userId', controllers.user.readOne)
router.get('/:userId/entries', controllers.user.entries)
router.get('/history/:userId', controllers.user.getUserHistory)
router.get('/:userId/contacts', controllers.user.readEmailConfidant)



module.exports = router;
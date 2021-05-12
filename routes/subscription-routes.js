const express = require('express');

const subscriptionController = require('../service/subscription-service');
const router = express.Router();

router.post('/',subscriptionController.addSubscription);
router.get('/:subscriptioncode', subscriptionController.getSubscriptionByCode);
router.post('/sendsubscriptioncode', subscriptionController.sendSubscriptionCodeToUser);
router.get('/checkusersubscription/:email', subscriptionController.checkIfUserIsSubscribed);
module.exports = router;
const express = require('express');

const router = express.Router();
const ordersController = require('../service/orders-service');

router.post('/addToCart', ordersController.addToCart);

router.post('/removeFromCart',ordersController.removeFromCart)

router.get('/userCartInfo/:pid', ordersController.getUserCartInfo )

router.post('/makepayment', ordersController.paymentCreated)

module.exports = router;
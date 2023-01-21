const express = require('express');
const router = express.Router();
const {getOrder, getOrderbyId, addOrder, updateOrder, deleteOrder} = require('../controler/OrderControler')
const midleware = require("../midlewares/authentication")

router.get('/v1/order', midleware.authentication, getOrder)
router.get('/v1/order/:id', midleware.authentication, getOrderbyId)
router.post('/v1/order/:userId/:cartId', midleware.authentication, addOrder)

//update property statusOrder
router.put('/v1/order/:id', midleware.authentication, updateOrder)

router.delete('/v1/order/:id', midleware.authentication, deleteOrder)

module.exports = router
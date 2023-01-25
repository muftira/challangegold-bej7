const express = require('express');
const router = express.Router();
// const {getOrder, getOrderbyId, addOrder, updateOrder, deleteOrder} = require('../controler/OrderControler')
const {OrderController} = require('../controler/OrderControler')
const orderController = new OrderController
const midleware = require("../midlewares/authentication")

router.get('/v1/order', midleware.authentication, orderController.getOrder)
router.get('/v1/order/:id', midleware.authentication, orderController.getOrderbyId)
router.post('/v1/order/:userId/:cartId', midleware.authentication, orderController.addOrder)

//update property statusOrder
router.put('/v1/order/:id', midleware.authentication, orderController.updateOrder)

router.delete('/v1/order/:id', midleware.authentication, orderController.deleteOrder)

module.exports = router
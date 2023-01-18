const express = require('express');
const router = express.Router();
const {getOrder, getOrderbyId, addOrder, updateOrder, deleteOrder} = require('../controler/OrderControler')

router.get('/v1/order', getOrder)
router.get('/v1/order/:id', getOrderbyId)
router.post('/v1/order/:userId/:cartId', addOrder)

//update property statusOrder
router.put('/v1/order/:id', updateOrder)

router.delete('/v1/order/:id', deleteOrder)

module.exports = router
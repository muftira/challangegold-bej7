const express = require('express');
const router = express.Router();
// const {getCart, getCartbyId, getCart_item, getCart_itembyId, deleteCartbyItem, deleteCartAllItem, addCart, addCartbyId, updateCartbyItem} = require('../controler/CartControlers');
const {CartController} = require('../controler/CartControlers')
const cartController = new CartController

router.get('/v1/cart', cartController.getCart)
router.get('/v1/cart/:id', cartController.getCartbyId)
router.get('/v1/cartitem', cartController.getCart_item)
router.get('/v1/cartitem/:id', cartController.getCart_itembyId)

// create cart for new cart or for the first time
router.post('/v1/cart/:itemId/:userId', cartController.addCart)

// create cart for same cartId
router.post('/v1/cartitem/:cartId/:itemId', cartController.addCartbyId)

//update cart for input quantityTotal and totalPrice property in cart table from Frontend side
router.put('/v1/cart/:id', cartController.updateCartbyItem)

// delete one item in cart and quantity property
router.delete('/v1/cartitem/:cartId/:itemId', cartController.deleteCartbyItem)

// delete cart or all items in cart
router.delete('/v1/cart/:id', cartController.deleteCartAllItem)

module.exports = router
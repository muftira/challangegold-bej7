const express = require('express');
const router = express.Router();
const {getCart, getCartbyId, getCart_item, getCart_itembyId, deleteCartbyItem, deleteCartAllItem, addCart, addCartbyId, updateCartbyItem} = require('../controler/CartControlers');

router.get('/v1/cart', getCart)
router.get('/v1/cart/:id', getCartbyId)
router.get('/v1/cartitem', getCart_item)
router.get('/v1/cartitem/:id', getCart_itembyId)

// create cart for new cart or for the first time
router.post('/v1/cart/:itemId/:userId', addCart)

// create cart for same cartId
router.post('/v1/cartitem/:cartId/:itemId', addCartbyId)

//update cart for input quantityTotal and totalPrice property in cart table from Frontend side
router.put('/v1/cart/:id', updateCartbyItem)

// delete one item in cart and quantity property
router.delete('/v1/cartitem/:cartId/:itemId', deleteCartbyItem)

// delete cart or all items in cart
router.delete('/v1/cart/:id', deleteCartAllItem)

module.exports = router
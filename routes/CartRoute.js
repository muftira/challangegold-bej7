const express = require('express');
const router = express.Router();
const {CartController} = require('../controler/CartControlers')
const cartController = new CartController

router.get('/v1/cart', cartController.getCart)
router.get('/v1/cart/:id', cartController.getCartbyId)
router.get('/v1/cartitem', cartController.getCart_item)
router.get('/v1/cartitem/:id', cartController.getCart_itembyId)


// buat cart baru atau untuk pertama kali
router.post('/v1/cart/:itemId/:userId', cartController.addCart)

// buat cart dengan cartId sama atau keduakali dan seterusnya
router.post('/v1/cartitem/:cartId/:itemId', cartController.addCartbyId)


// update cart untuk input quantityTotal dan totalPrice property di cart tabel dari sisi frontend
router.put('/v1/cart/:id', cartController.updateCartbyItem)


// delete satu item di cart dan property quantity 
router.delete('/v1/cartitem/:cartId/:itemId', cartController.deleteCartbyItem)


// delete cart atau semua item di cart
router.delete('/v1/cart/:id', cartController.deleteCartAllItem)

module.exports = router
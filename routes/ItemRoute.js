const express = require('express');
const router = express.Router();
const {getItem,getItembyId,addItem,updateItem,deleteItem} = require('../controler/ItemControler')

router.get('/v1/item', getItem)
router.get('/v1/item/:id', getItembyId)
router.post('/v1/itemproduct/:userId', addItem)
router.put('/v1/item/:id', updateItem)
router.delete('/v1/item/:id', deleteItem)

module.exports = router

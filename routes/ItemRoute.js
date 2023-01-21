const express = require('express');
const router = express.Router();
const {getItem,getItembyId,addItem,updateItem,deleteItem} = require('../controler/ItemControler')
const midleware = require("../midlewares/authentication")

router.get('/v1/item',  getItem)
router.get('/v1/item/:id', getItembyId)
router.post('/v1/itemproduct/:userId', midleware.authentication, addItem)
router.put('/v1/item/:id', midleware.authentication, updateItem)
router.delete('/v1/item/:id', midleware.authentication, deleteItem)

module.exports = router

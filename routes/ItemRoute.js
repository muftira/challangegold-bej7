const express = require('express');
const router = express.Router();
// const {getItem,getItembyId,addItem,updateItem,deleteItem} = require('../controler/ItemControler')
const {ItemController }= require('../controler/ItemControler')
const itemController = new ItemController()
const midleware = require("../midlewares/authentication")

router.get('/v1/item',  itemController.getItem)
router.get('/v1/item/:id', itemController.getItembyId)
router.post('/v1/itemproduct/:userId', midleware.authentication, itemController.addItem)
router.put('/v1/item/:id', midleware.authentication, itemController.updateItem)
router.delete('/v1/item/:id', midleware.authentication, itemController.deleteItem)

module.exports = router

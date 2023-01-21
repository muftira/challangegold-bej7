const {Cart, Cart_item, Item, User, sequelize} = require('../models')
const { Op, fn } = require("sequelize");

exports.getCart = async (req, res) => {
    try {
        const result = await Cart.findAll({
            where: {statusCart: false},
            include: [{
                model: User
            },
            {
                model: Cart_item,
                as: "ItemsProduct",
                attributes: ["id", "itemId", "cartId", "quantity", "createdAt", "updatedAt"],
                include: Item
                
            }]
        })

        res.status(200).json({
            message: 'Success',
            data: result
        })

    } catch (error) {
        res.json({
            message: 'Cart Data Failed',
            data: error
        })
    }
}

exports.getCartbyId = async (req, res) => {
    try {
        const {id} = req.params
        const result = await Cart.findOne({
            where: {[Op.and]: [{id}, {statusCart: false}]
            }
            })
        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Cart Data Failed',
            data: error
        })
    }
}

exports.getCart_item = async (req, res) => {
    try {
        const result = await Cart_item.findAll({
            attributes: ['id', 'itemId', "quantity", 'cartId', "createdAt", "updatedAt"],
            include: [
                {
                    model: Item
                },
                {
                    model: Cart
                }
            ]
    })
        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Cart Data Failed',
            data: error
        })
    }
}

exports.getCart_itembyId = async (req, res) => {
    try {
        const {id} = req.params
        const result = await Cart_item.findOne({where: {id}, 
            attributes: ['id', 'itemId', 'cartId', "quantity", "createdAt", "updatedAt"],
            include: [
            {
                model: Item
            },
            {
                model: Cart
            }
        ]})
        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Cart Data Failed',
            data: error
        })
    }
}

// create cart for new cart or for the first time
exports.addCart = async (req, res) => {
    try {
        const {itemId, userId} = req.params
        const {quantity} = req.body
        const result1 = await Cart.create({userId})
        const result2 = await Cart_item.create({userId, itemId, cartId:result1.id, quantity})
        res.status(201).json({
            message: 'Success',
            data: result1
        })
    } catch (error) {
        res.json({
            message: 'Cart Data Failed',
            data: error
        })
    }
}


// create cart for same cartId
exports.addCartbyId = async (req, res) => {
    try {
        const {cartId, itemId} = req.params
        const _item = await Cart_item.findAll({where: {[Op.and] : [{itemId}, {cartId}]}})

        if ( _item.length > 0) {
            await Cart_item.update({quantity: _item[0].dataValues.quantity + 1}, {where: {[Op.and] : [{itemId}, {cartId}]}})
        } else {
             await Cart_item.create({itemId, cartId})
        }

        const result = await Cart_item.findOne({where: {[Op.and] : [{itemId}, {cartId}]}})

        res.status(201).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Cart Data Failed',
            data: error
        })
    }
}

//update cart for input quantityTotal and totalPrice property in cart table from Frontend side
exports.updateCartbyItem = async (req, res) => {
    try {
        const {id} = req.params
        const {quantityTotal, totalPrice} = req.body
        const result = await Cart.update({quantityTotal, totalPrice}, {where: {id}})

        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Cart Data Failed',
            data: error
        })
    }
}


// delete one item in cart and quantity property
exports.deleteCartbyItem = async (req, res) => {
    try {
        const {cartId, itemId} = req.params
        const _item = await Cart_item.findOne({where: {[Op.and] : [{itemId}, {cartId}]}})

        if ( _item.dataValues.quantity > 1) {
            await Cart_item.update({quantity: _item.dataValues.quantity - 1}, {where: {[Op.and] : [{itemId}, {cartId}]}})
        } else if (_item.dataValues.quantity == 1) {
            await Cart_item.destroy({where: {[Op.and] : [{itemId}, {cartId}]}})
        }

        const result = await Cart_item.findOne({
            where: {[Op.and] : [{itemId}, {cartId}]}
        })
        
        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Cart Data Failed',
            data: error
        })
    }
}

// delete cart or all items in cart
exports.deleteCartAllItem = async (req, res) => {
    try {
        const {id} = req.params
        const result = await Cart.destroy({where : {id}})
        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Cart Data Failed',
            data: error
        })
    }
}
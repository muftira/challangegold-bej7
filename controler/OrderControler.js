const {Order, Cart, Item, User} = require("../models")

exports.getOrder = async (req, res) => {
    try {
        const result = await Order.findAll({
            include: [{
                model: User
            },
                {
                model: Cart,
                include: {
                    model: Item
                }
            }]
        })
        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Order Data Failed',
            data: error
        })
    }
}

exports.getOrderbyId = async (req, res) => {
    try {
        const {id} = req.params
        const result = await Order.findOne({where: {id}, 
            include: [{
                model: User
            },
                {
                model: Cart,
                include: {
                    model: Item
                }
            }]
        })
        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Order Data Failed',
            data: error
        })
    }
}

exports.addOrder = async (req, res) => {
    try {
        const {userId, cartId} = req.params
        const result2 = await Cart.update({statusCart: true}, {where: {id: cartId}})
        const result = await Order.create({userId, cartId, statusOrder: "pending"})
        res.status(201).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Order Data Failed',
            data: error
        })
    }
}

//update property statusOrder
exports.updateOrder = async (req, res) => {
    try {
        const {id} = req.params
        const {statusOrder} = req.body
        const result = await Order.update({statusOrder},{
            where : {
                id
            }
        })
        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Order Data Failed',
            data: error
        })
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const {id} = req.params
        const result = await Order.destroy({where : {id}})
        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Order Data Failed',
            data: error
        })
    }
}

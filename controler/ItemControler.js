const { Item, User } = require('../models')

exports.getItem = async (req, res) => {
    try {
        const result = await Item.findAll({
            include: {
                model: User,
                attributes: ["id", "fullName", "email", "phone", "role"]
            }
        })
        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Product Data Failed',
            data: error
        })
    }
}

exports.getItembyId = async (req, res) => {
    try {
        const {id} = req.params
        const result = await Item.findOne({where: {id},
            include: {
                model: User,
                attributes: ["id", "fullName", "email", "phone", "role"]
            }
        })
        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Product Data Failed',
            data: error
        })
    }
}

exports.addItem = async (req, res) => {
    try {
        const {userId} = req.params
        const {productName, price} = req.body
        const result = await Item.create({userId, productName, price})
        res.status(201).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Product User Failed',
            data: error
        })
    }
}

exports.updateItem = async (req, res) => {
    try {
        const {id} = req.params
        const {productName, price} = req.body
        const result = await Item.update({productName, price},{
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
            message: 'Product User Failed',
            data: error
        })
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const {id} = req.params
        const result = await Item.destroy({where : {id}})
        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Product User Failed',
            data: error
        })
    }
}

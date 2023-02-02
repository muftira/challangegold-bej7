const { Item, User } = require('../models')

class ItemController {
    async getItem(req, res) {
        try {
            const result = await Item.findAll({
                include: {
                    model: User,
                    attributes: ["id", "fullName", "email", "phone"]
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
    
    async getItembyId(req, res) {
        try {
            const {id} = req.params
            const result = await Item.findOne({where: {id},
                include: {
                    model: User,
                    attributes: ["id", "fullName", "email", "phone"]
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
    
    async addItem(req, res) {
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
    
    async updateItem(req, res) {
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
    
    async deleteItem(req, res) {
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
    
}

module.exports = {
    ItemController
}

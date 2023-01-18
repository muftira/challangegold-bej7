const { User, Order, Cart, Item } = require('../models')
const Validator = require('fastest-validator')
const v = new Validator()

exports.getUser = async (req, res) => {
    try {
        const result = await User.findAll({
            include: [{
                model: Order
            },
            {
                model: Cart,
                include: {
                    model: Item
                }
            }
        ]
        })
        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'User Data Failed',
            data: error
        })
    }
}

exports.getUserbyId = async (req, res) => {
    try {
        const {id} = req.params
        const result = await User.findOne({where: {id}, 
            include: [{
                model: Order
            },
            {
                model: Cart,
                include: {
                    model: Item
                }
            }
        ]
    })
        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'User Data Failed',
            data: error
        })
    }
}

exports.addUser = async (req, res) => {
    try {
        const {fullName,email, password, address, phone, role} = req.body
        const checkUser = await User.findOne({where: {email}})
        const schema = {
            email: {type: "email", optional: false},
            password: {type: "string", min: 5, max: 255, optional: false}
        }
        

        if(checkUser){
            // validate Email
            if(checkUser.dataValues.email == email){
                    res.status(401).json({
                    message: 'Email is Alredy Exist',
                    data: {}
                })
            }else{
                // Validate Data
                 const validationResult = v.validate({email, password}, schema)

                if(validationResult !== true){
                res.status(401).json({
                message: 'Validation Failed',
                data: validationResult
                    })
                }else{
                    const result = await User.create({fullName,email, password, address, phone, role})
                    res.status(201).json({
                    message: 'Success',
                    data: result
                    })
                }      
            }
        }else{
            // Validate Data
            const validationResult = v.validate({email, password}, schema)

            if(validationResult !== true){
                res.status(401).json({
                message: 'Validation Failed',
                data: validationResult
                 })
            }else{
                const result2 = await User.create({fullName,email, password, address, phone, role})
                res.status(201).json({
                message: 'Success',
                data: result2
                })
            }
                
        }
        
    } catch (error) {
        res.json({
            message: 'Add User Failed',
            data: error
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const checkUser = await User.findOne({where: {email}})

        if(checkUser) {
            if(checkUser.dataValues.password == password){
                res.status(200).json({
                    message: 'Login success',
                    data: checkUser
                }) 
            }else{
                res.status(401).json({
                    message: 'Wrong Password',
                    data: {}
                }) 
            }
        }else{
            res.status(401).json({
                message: 'Email not Found',
                data: {}
            }) 
        }
        
    } catch (error) {
        res.status(500).json({
            message: 'Login User Failed',
            data: error
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params
        const {fullName, email, password, address, phone, role} = req.body
        const checkUser = await User.findOne({where: {email}})
        const schema = {
            email: {type: "email", optional: false},
            password: {type: "string", min: 5, max: 255, optional: false}
        }

        if(checkUser){
            // Validate Email
            if(checkUser.dataValues.email == email){
                res.status(401).json({
                    message: 'Email is Alredy Exist',
                    data: {}
                })
            }else{
                // Validate Data
                const validationResult = v.validate({email, password}, schema)

                if(validationResult !== true){
                res.status(401).json({
                message: 'Validation Failed',
                data: validationResult
                    })
                }else{
                    const result = await User.update({fullName, email, password, address, phone, role},{
                        where : {
                            id
                        }
                    })
                    res.status(200).json({
                        message: 'Success',
                        data: result
                    })
                }     
            }
        }else{
            // Validate Data
            const validationResult = v.validate({email, password}, schema)

            if(validationResult !== true){
            res.status(401).json({
            message: 'Validation Failed',
            data: validationResult
                })
            }else{
                const result2 = await User.update({fullName, email, password, address, phone, role},{
                    where : {
                        id
                    }
                })
                res.status(200).json({
                    message: 'Success',
                    data: result2
                })
            }     
        }

        
    } catch (error) {
        res.json({
            message: 'Add User Failed',
            data: error
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        const result = await User.destroy({where : {id}})
        res.status(200).json({
            message: 'Success',
            data: result
        })
    } catch (error) {
        res.json({
            message: 'Add User Failed',
            data: error
        })
    }
}

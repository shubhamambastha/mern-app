const jwt = require('jsonwebtoken');
const db = require('../models')

exports.register = async (req, res, next)=>{
    try {
        const user = await db.Users.create(req.body);

        // destructuring for getting only id and email/username
        const {id, email} = user
        // JSON web token
        const token = jwt.sign({id, email}, process.env.SECRET)

        res.status(201).json({id, email, token})
    } catch (error) {
        if(error.code === 11000){
            error.message = "User already taken"
        }
        next(error)
    }
}

exports.login = async (req, res, next)=>{
    try {
        const user = await db.Users.findOne({email: req.body.email});
        const {id, email} = user;
        const valid = await user.comparePassword(req.body.password);

        if(valid){

            const token = jwt.sign({id, email}, process.env.SECRET)
            res.status(200).json({id, email, token})
        } else{
            res.send("Users not found")
        }

    } catch (error) {
        error.message = "invalid error"
        next(error)
    }
}
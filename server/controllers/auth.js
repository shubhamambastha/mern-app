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
    } catch (err) {
        if(err.code === 11000){
            err.message = "User already taken"
        }
        return next({
            status: 400,
            message: err.message
        });
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
            throw new Error();
        }

    } catch (error) {
        console.log("server", error)
        return next({ 
            status: 400, 
            message: 'Invalid Username/Password' 
        });
    }
}
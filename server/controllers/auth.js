const db = require('../models')

exports.register = async (req, res, next)=>{
    console.log("here comes in controller")
    try {
        const user = await db.Users.create(req.body);
        // destructuring for getting only id and email/username
        const {id, email} = user
        res.json({id, email})
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next)=>{
    try {
        const user = await db.Users.findOne({email: req.body.email});
        const {id, email} = user;
        const valid = await user.comparePassword(req.body.password);

        if(valid){
            res.json({id, email})
        } else{
            res.send("Users not found")
        }

    } catch (error) {
        next(error)
    }
}
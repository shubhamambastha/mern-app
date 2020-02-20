const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    console.log(req.headers)
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET, (err, decoded)=>{
            if(err){
                next(Error("failed to auth token"))
            } else{
                req.decoded = decoded;
                next()
            }
        })
    } else {
        next(Error("no token found"))
    }
}
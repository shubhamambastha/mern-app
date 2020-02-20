require('dotenv').config()

const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

connect=()=>{
    return(
        mongoose.connect(process.env.DATABASE,{
            useNewUrlParser : true,
            useUnifiedTopology: true
        })
    )
}

module.exports = {
    Users: require('./Users'),
    Polls: require('./Polls'),
    connect: connect
};
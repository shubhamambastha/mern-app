const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

connect=()=>{
    return(
        mongoose.connect('mongodb://localhost:27017/vote',{
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
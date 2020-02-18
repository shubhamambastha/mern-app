const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: String,
    options: [{
        options: String,
        votes: {
            type: Number,
            default: 0
        }
    }],
    voted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}); 


const Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll
const db = require('../models');

exports.showPolls = async (req, res, next)=>{
    try {
        const polls = await db.Polls.find().populate('user', ['email', 'id']);
        res.status(200).json(polls);
    } catch (error) {
        return next({
            status: 400,
            message: error.message,
        });
    }
}

exports.createPoll = async (req, res, next)=>{
    const {id} = req.decoded;
    const {question, options} = req.body;
    try {
        const user = await db.Users.findById(id)
        const polls = await db.Polls.create({
            question,
            user,
            options: options.map(option=>({
                option,
                votes:0
            }))
        });

        user.polls.push(polls._id);
        await user.save();

        res.status(201).json({...polls._doc, user: user._id});
    } catch (error) {
        return next({
            status: 400,
            message: error.message,
        });
    }
}

exports.usersPolls = async (req, res, next)=>{
    const {id} = req.decoded;
    try {
        const user = await db.Users.findById(id).populate('polls')

        res.status(201).json(user.polls);
    } catch (error) {
        return next({
            status: 400,
            message: error.message,
        });
    }
}

exports.getPolls = async (req, res, next)=>{
    try {
        const {id} = req.params;
        const poll = await db.Polls.findById(id).populate('user', ['email', 'id'])

        if(!poll){
            throw new Error('NO poll found')
        }

        res.status(200).json(poll);
    } catch (error) {
        return next({
            status: 400,
            message: error.message,
        });
    }
}

exports.deletePoll = async (req, res, next)=>{
    try {
        const {id: userId} = req.decoded;
        const {id: pollId} = req.params;
        let user = await db.Users.findById(userId)
        if(user.polls) {
          user.polls = user.polls.filter(userPoll => {
            return userPoll._id.toString() !== pollId.toString()
          })
        }

        const poll = await db.Polls.findById(pollId).populate('polls')
        if(!poll){
            throw new Error("No poll found Delete")
        }
        if(poll.user.toString() !== userId){
            throw new Error("Unauthorized delete access")
        }

        await user.save()
        await poll.remove()

        res.status(202).json({ poll, deleted: true });
    } catch (error) {
        return next({
            status: 400,
            message: error.message,
        });
    }
}

exports.vote = async (req, res, next)=>{
    try {
        const {id: userId} = req.decoded;
        const {id: pollId} = req.params;
        const {answer} = req.body;
        if (answer) {
            const poll = await db.Polls.findById(pollId);
            if (!poll) throw new Error('No poll found');
      
            const vote = poll.options.map(options => {
                if(options.option === answer){
                    return {
                        option: options.option,
                        _id: options._id,
                        votes: options.votes + 1,
                    }
                }else{
                    return options
                }
            });

            if (poll.voted.filter(user => user.toString() === userId).length <= 0) {
                poll.voted.push(userId);
                poll.options = vote;
                await poll.save();
      
                return res.status(202).json(poll);
            } else {
                throw new Error('Already voted');
            }
        } else {
            throw new Error('No Answer Provided');
        }
    } catch (error) {
        return next({
            status: 400,
            message: error.message,
        });
    }
}
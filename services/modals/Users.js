const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    userName:{
        type:String
    },
    password:{
        type:String
    },
    mail:{
        type:String
    },
    userPhoto:{
        type:String,
        default:'uploads/default/user.png',
    },
    userBanType:{
        type:Number,
        default:0,
    },
    userUniversity:{
        type:String
    },
    userFinishUniversity:{
        type:String
    },
    userStatus:{
        type:String
    },
    userMailCode:{
        type:String,
    },
    commentsId:[],
    postLike:[],
    userCreated:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Users', Users);

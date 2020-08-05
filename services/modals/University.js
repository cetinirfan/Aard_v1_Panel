const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const University = new Schema({
    universityName:{
        type:String
    },
    universityProvince:{
        type:String
    },
    universityPhoto:{
        type:String,
        default:'uploads/default/university.png',
    },
    faculties:[
        {   
            name:{type:String},
            department:[
                {
                    name:{type:String},
                    departmentComment:[],
                    points:[]
                }
            ]
        }
    ],
    commentsId:[],
    universityCreated:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('University', University);

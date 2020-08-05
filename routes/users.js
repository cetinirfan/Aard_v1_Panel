const express = require('express');
const router = express.Router();
const Admin = require('../services/modals/Admin');
const Users = require('../services/modals/Users');
const moment = require('moment');
require('moment/locale/tr');
const verifyToken = require('../services/middleware/verify-token');

router.get('/users',verifyToken,(req,res)=>{
    Users.find({userBanType:0},(err,find_user)=>{
        if(err){
            return res.render('error.ejs');
        }
        res.render('users.ejs',{
            find_user,
            moment, 
            title:'Tüm Kullanıcılar'          
        })
    });

});

router.get('/deleteUser/:_id',verifyToken,(req,res)=>{
    Users.findByIdAndRemove({_id:req.params._id},(err,find_user)=>{
        if(err){
            return res.render('error.ejs');
        }
        return res.send("<script> alert('Kullanıcı Başarıyla Silindi'); window.location = '/users/users/'; </script>")
    });
});


module.exports = router;
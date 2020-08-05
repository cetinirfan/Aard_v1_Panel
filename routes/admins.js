const express = require('express');
const router = express.Router();
const Admin = require('../services/modals/Admin');
const Users = require('../services/modals/Users');
const moment = require('moment');
const md5 =require('md5');
require('moment/locale/tr');
const verifyToken = require('../services/middleware/verify-token');

router.get('/register',verifyToken,(req,res) => {
    res.render('addAdmin.ejs');
});

router.post('/register', (req,res) => {
    const { adminFullName,telephone,mail,password,password2} = req.body;
    if(password != password2){
        return res.send("<script> alert('Şifreler uyuşmadı'); window.location = '/admins/register/'; </script>");
    }
    const newAdmin = new Admin({
        adminFullName,
        telephone,
        mail,
        password:md5(password)
    });
    newAdmin.save ((err,find_admin) => {
        if(err){
            res.render('error.ejs');
        }
        return res.send("<script> alert('Yönetici başarıyla eklendi'); window.location = '/admins/admins/'; </script>");
    });
});

router.get('/admins',verifyToken,(req,res)=>{
    Admin.find({},(err,find_admin)=>{
        if(err){
            return res.render('error.ejs');
        }
        res.render('admins.ejs',{
            find_admin,
            moment,
            title:'Yöneticiler'
        })
    });

});

router.get('/adminProfile/:_id',verifyToken,(req,res)=>{
    Admin.findOne({_id:req.params._id},(err,find_admin)=>{
        if(err){
            return res.render('error.ejs');
        }
        res.render('adminProfile.ejs',{
            find_admin,
            moment,
        })
    });
});

router.get('/updateProfile/:_id',verifyToken,(req,res)=>{
    Admin.findOne({_id: req.params._id},(err,find_admin)=>{
        if(err){
            return res.render('error.ejs');
        }
        
        res.render('updateAdmin.ejs',{
            find_admin,
            moment,
        })

    });
});

router.get('/deleteAdmin/:_id',verifyToken,(req,res)=>{
    Admin.findByIdAndRemove({_id:req.params._id},(err,find_user)=>{
        if(err){
            return res.render('error.ejs');
        }
        return res.send("<script> alert('Yönetici Başarıyla Silindi'); window.location = '/admins/admins/'; </script>")
    });
});
router.post('/updateProfile/:_id',verifyToken,(req,res)=>{

    const { telephone, mail } = req.body;
    const _id = req.params._id;

    if(! mail || !telephone || !_id){
        return res.send("<script> alert('Lütfen tüm alanları doldurunuz.'); window.location = '/admins/updateProfile/"+_id+"'; </script>")
    }
    Admin.updateOne({_id:req.params._id},{$set:{
        mail,
        telephone,
    }},(err,find_admin)=>{
        if(err){
            return res.render('error.ejs');
        }

        return res.send("<script> alert('Güncelleme işlemi başarılı.'); window.location = '/admins/admins/'; </script>")
    });

});





module.exports = router;
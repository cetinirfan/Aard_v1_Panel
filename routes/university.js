const express = require('express');
const router = express.Router();
const University = require('../services/modals/University');
const moment = require('moment');
require('moment/locale/tr');
const verifyToken = require('../services/middleware/verify-token');
var multer  = require('multer')

router.get('/university',verifyToken,(req,res)=>{
    University.find({},(err,find_university)=>{
      if(err){
          return res.render('error.ejs');
      }
      res.render('university.ejs',{
        find_university,
          /*moment,*/
          title:'Tüm Üniversiteler' 
      })
  });
});

router.get('/selectUniversity/:_id',verifyToken,(req,res)=>{
    University.findOne({_id:req.params._id},(err,find_faculties)=>{
      if(err){
          return res.render('error.ejs');
      }
      res.render('faculties.ejs',{
        find_faculties,
          /*moment,*/
          title:'Fakülteler' 
      })
  });
});

router.get('/selectDepartment/:_universtiyid/:_facultiesid',verifyToken,(req,res)=>{
    let array = []
    University.findOne({_id:req.params._universtiyid,'faculties._id':req.params._facultiesid},(err,find_department)=>{
        if(err){
            return res.render('error.ejs');
        }else{
            array.push(find_department)
            array.map(item=>{
                const UniversityId =item._id
                const FacultiesId =req.params._facultiesid
                console.log(UniversityId)
            item.faculties.map(item2=>{
                if(item2._id==req.params._facultiesid){
                    const find_department1 =item2.department
                    console.log(find_department1)
                    res.render('department.ejs',{
                        find_department1,
                        UniversityId,
                        FacultiesId,
                          /*moment,*/
                        title:'Bölümler' 
                      })
                }
                
            })
        })
        }
  });
});

router.get('/addPoints/:_universtiyid/:_facultiesid/:_departmentid',verifyToken,(req,res)=>{
    let array = []
    const UniversityId =req.params._universtiyid
    const FacultiesId =req.params._facultiesid
    const DepartmentId =req.params._departmentid
    University.findOne({_id:req.params._universtiyid,'faculties._id':req.params._facultiesid},(err,find_department)=>{
        if(err){
            return res.render('error.ejs');
        }else{
            array.push(find_department)
            array.map(item=>{
                console.log(UniversityId)
            item.faculties.map(item2=>{
                if(item2._id==req.params._facultiesid){
                    const find_department1 =item2.department
                    console.log(find_department1[0].points)
                    res.render('addPoints.ejs',{
                        find_department1,
                        UniversityId,
                        FacultiesId,
                        DepartmentId,
                      })
                }
                
            })
        })
        }
  });
});

router.post('/addPoints/:_universtiyid/:_facultiesid/:_departmentid',verifyToken, (req,res) => {
    const { educationType,priceType,ranking,point} = req.body;
    const docs = (educationType+','+priceType+','+ranking+','+point)
        if(! educationType || !priceType || !ranking || !point){
            return res.send("<script> alert('Lütfen tüm alanları doldurunuz.'); window.location = '../../../university/addPoints/"+req.params._universtiyid+"/"+req.params._facultiesid+"/"+req.params._departmentid+"'; </script>")
        }
    University.findOneAndUpdate({_id:req.params._universtiyid,'faculties._id':req.params._facultiesid},
    { $push:
        {  'faculties.$[outer].department.$[inner].points':docs}},
        {
            arrayFilters: [
                {
                    'outer._id': req.params._facultiesid
                },
                {
                    'inner._id': req.params._departmentid
                }
            ]
        },
        (err,find_department)=>{
        if(err){
            console.log(err)
            return res.render('error.ejs');
        }else{
            console.log(find_department.faculties[0].department[0])
            return res.send("<script> alert('Puan başarıyla eklendi'); window.location = '../../../../university/addPoints/"+req.params._universtiyid+"/"+req.params._facultiesid+"/"+req.params._departmentid+"'; </script>");
        }
  });
});

module.exports = router;

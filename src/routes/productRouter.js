const express = require("express");
const mainController = require("../controllers/mainController");
const router = express.Router()
const ProductController=require('../controllers/productController')
const path=require('path')
const {body}=require("express-validator")
const multer=require('multer');
const { createProductValidation }=require('../validations/productValidation');
const storage=multer.diskStorage({destination:(req,file,cb)=>{
cb(null,path.join(__dirname,'../../public/img/imagenes-platos'))},
filename:(req,file,cb)=>{ const newFilename =file.fieldname +Date.now()+"-"+path.extname(file.originalname);
cb(null,newFilename);
}});
const upload = multer ( {storage:storage,fileFilter:(req,file,cb)=>{
    const extensionesAceptadas =[".jpg",".png",".txt"];
    const info=path.extname(file.originalname)
    const result=extensionesAceptadas.includes(info)
   cb(null,result)
    // cb(null,true)
    // cb(null,false)
    }})

router.get('/list',ProductController.list)
router.get('/detail/:id',ProductController.detail)
router.get('/create',ProductController.create)
router.post('/create',upload.single("image"),createProductValidation,ProductController.store)
router.get('/edit/:id',ProductController.edit)
router.put('/edit/:id',ProductController.update)
router.delete("/delete/:id",ProductController.destroy)
module.exports = router
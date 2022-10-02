const {body}=require('express-validator');
const path=require("path")
module.exports={
createProductValidation:[
  body('name')
  .notEmpty()
  .withMessage('Campo name Incompleto')
  .isLength({min:1,max:10})
  .withMessage('Campo name no puede tener mas de 10 caracteres'),
  body("price")
  .notEmpty()
  .withMessage('Campo price incompleto'),
  body('description')
  .notEmpty()
  .withMessage('Campo description incompleto'),
  body('image')
  .custom(function(value,{req}) {
    return req.file
  }).withMessage("Campo obligatorio Imagen")
  .bail()
  .custom(function(value,{req}){
    const extensionesAceptadas =[".jpg",".png",".txt"];
    const extension =path.extname(req.file.originalname)
  return  extensionesAceptadas.includes(extension);
  }).withMessage("Imagen invalida")
],
updateProductValidation:[



]
}
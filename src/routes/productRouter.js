const express = require("express");
const mainController = require("../controllers/mainController");
const router = express.Router()
const ProductController=require('../controllers/productController')
router.get('/list',ProductController.list)
router.get('/detail/:id',ProductController.detail)
router.get('/create',ProductController.create)
router.post('/create',ProductController.store)
router.get('/edit/:id',ProductController.edit)
router.put('/edit/:id',ProductController.update)
module.exports = router
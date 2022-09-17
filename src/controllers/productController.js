const { equal } = require("assert")
const fs=require("fs")
const { dirname } = require("path")
const path=require("path")

function findAll(){
  const jsonData =  fs.readFileSync(path.join(__dirname,"../data/products.json"))
 const data= JSON.parse(jsonData)
return data
}
function WriteFile(data) {
 const dataString=JSON.stringify(data,null,4)
 fs.writeFileSync(path.join(__dirname,"../data/products.json"), dataString)
}


const controllers={
list:(req,res)=>{
    const data=findAll()
    res.render('menu-products',{ products:data })
},
detail:(req,res)=>{
  const data=findAll()
  const platoEncontrado =data.find(function(plato){
    return plato.id==req.params.id
  })

  res.render("product-detail",{plato:platoEncontrado})},
  create:(req,res)=>{

res.render("product-create-form")

  },
store:(req,res)=>{
const data= findAll()
 const newProduct={
  id:data.length+1,
  name:req.body.name,
  price:req.body.price,
  description:req.body.description
 }
data.push(newProduct);
WriteFile(data)
res.redirect("/products/create");
},
edit:(req,res)=>{

  const data=findAll()
  const platoEncontrado =data.find(function(plato){
    return plato.id==req.params.id
  })

  res.render("product-update-form",{plato:platoEncontrado})},

update:(req,res)=>{
  const data=findAll()
  const platoEncontrado =data.find(function(plato){
    return plato.id==req.params.id
  })

  platoEncontrado.name=req.body.name
  platoEncontrado.price=req.body.price
  platoEncontrado.description=req.body.description
  
  WriteFile(data)

  res.redirect("/products/list")
}
}

module.exports=controllers;
const expres = require('express')
const {promises: fs} = require('fs');
const Contendor =require('../tp2')

const app = expres ()


const productos = new Contendor('./productos.txt');

app.get('/productos',async(req, res)=>{
 
    let prods = await productos.getAll();//traigo todos los productos
    console.log(prods)
    res.send( prods)
})
  
  app.get('/productoRandom',async(req, res)=>{
   
    let prods = await productos.getAll();//traigo todos los productos
    let elProducto = Math.floor(Math.random()*prods.length);//guardo la posicion del producto aleatoriamente
    res.send( prods[elProducto])
  })

const server = app.listen(8080,()=>{
    console.log('servidor escuchando en el 8080')
})
server.on('error',err =>  console.log('hubo un error'+err))
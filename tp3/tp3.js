const expres = require('express')
const {promises: fs} = require('fs');
const Contendor =require('../tp2')

const app = expres ()




app.get('/productos',async(req, res)=>{
  const productos = new Contendor('./tp3/productos.txt');
    let prods = await productos.getAll();//traigo todos los productos
    res.send( prods).join('')
})
  
  app.get('/productoRandom',async(req, res)=>{
    const productos = new Contendor('./tp3/productos.txt');
    let prods = await productos.getAll();//traigo todos los productos
    let elProducto = Math.floor(Math.random()*prods.length);//guardo la posicion del producto aleatoriamente
    res.send( prods[elProducto])
  })

const server = app.listen(8080,()=>{
    console.log('servidor escuchando en el 8080')
})
server.on('error',err =>  console.log('hubo un error'+err))
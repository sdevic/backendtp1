const expres = require('express')
const {promises: fs} = require('fs');

const pathFile = "tp3/Productos.txt"



class Contendor{
    async getAll(){
        let data = null;
    
        let dataObj = [];
   
        try{
         data = await fs.readFile(pathFile,'utf-8')
         dataObj = JSON.parse(data);
        }catch(err){
            return dataObj;
        }
        
         return dataObj
    }
    async ranom() {
        let aleatorio = await this.getAll();//traigo el array completo
        let elProducto = Math.floor(Math.random()*aleatorio.length);//guardo la posicion del producto aleatoriamente
        
        return aleatorio[elProducto]//devuelvo el producto
       }
}

const app = expres ()

app.get('/',(req, res)=>{
    res.send('<h1>hola Ari</h1>')//en el home te saludo
})
app.get('/productos',async(req, res)=>{
    const usr = new Contendor( )
    let prueba = await usr.getAll();//traigo todos los productos
    res.send( prueba.map(product =>//los listo y los muestro de manera prolija
        `<h2>${product.title} </h2>
        <img  src=${product.thumbnail} alt="" /> 
        <h2>${product.price} </h2>`
      ).join('')
    )
  })
  app.get('/productoRandom',async(req, res)=>{
    const ult = new Contendor( )
    let resultado = await ult.ranom();//traigo el producto random
    
    res.send( `<h2>${resultado.title} </h2>
    <img  src=${resultado.thumbnail} alt="" /> 
    <h2>${resultado.price} </h2>` )// lo muestro
  })

const server = app.listen(8080,()=>{
    console.log('servidor escuchando en el 8080')
})


server.on('error',err =>  console.log('hubo un error'+err))
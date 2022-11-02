const { clear } = require('console');
const {promises: fs} = require('fs');


class Contendor{
    constructor (nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        
        
        
    }
    async save(obj){
        let data = null;
        let id= 0;
        let dataObj = [];
        
        try{
            data = await fs.readFile('./Productos.txt','utf-8')
            
        }catch(err){
            console.log(err)
        }
        if(data.length == 0){
            id = 1;
            data = [{...obj,id: id}]
            
            
        }else{
            dataObj = JSON.parse(data);
            
            id  = dataObj[dataObj.length-1].id+1;
           
            
        }
        const nObj = {id: id, ...usr};
        dataObj.push(nObj);
        
        
        fs.writeFile('./Productos.txt',JSON.stringify(dataObj));
        console.log("se asigno el ID:"+id)
        
    }
    async getById(id){
        let data = null;
        let dataObj;
        
       
        try{
            data = await fs.readFile('./Productos.txt','utf-8')
            dataObj = JSON.parse(data);
        }catch(err){
            console.log(err)
        }
        const uno = dataObj.filter(usuario => usuario.id === id);
        if(uno == ""){
            console.log(null)
        }else{
            console.log(uno)
        }
    }
    async deleteById(id){
        let data = null;
        
        let dataObj= null
       
        try{
            data = await fs.readFile('./Productos.txt','utf-8')
            dataObj = JSON.parse(data);
        }catch(err){
            console.log(err)
        }
        const uno = dataObj.filter(usuario => usuario.id !== id);
        fs.writeFile('./Productos.txt',JSON.stringify(uno));
        console.log("Se elimino el  objeto Numero:"+id)
    }
    async getAll(){
        let data = null;
        
        let dataObj = [];
       
        try{
            data = await fs.readFile('./Productos.txt','utf-8')
            dataObj = JSON.parse(data);
        }catch(err){
            console.log(err)
        }
        console.log(dataObj)
    }
    async deleteAll(){
       
        fs.writeFile('./Productos.txt',"");
    }
}


const usr = new Contendor( "flor",  'devich')


function ejecutar(){
    setTimeout(()=>{
        usr.save(usr);
        } ,1000);
     setTimeout(()=>{
        usr.getById(3);
        } ,2000);
    setTimeout(()=>{
        usr.getAll();
        } ,3000);
    setTimeout(()=>{
        usr.deleteById(3);
        } ,4000);
    setTimeout(()=>{
        usr.deleteAll();
        } ,5000);    
}


ejecutar()

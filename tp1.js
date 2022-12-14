class Usuario {
    constructor (nombre,apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    // imprimo  el nimbre y apellido del usuario
    getFullName(){ console.log (`Nombre completo:  ${this.nombre} ${this.apellido}`) };

    // le agrego al final del array una nueva mascota
    addMascotas = (newPet) => { this.mascotas.push(newPet)};

    //Muestro la cantidad de mascotas que tiene el usuario
    countMascotas(){console.log(` ${this.nombre} ${this.apellido}, tiene ${this.mascotas.length}  mascotas`)};
    
    //Agrego un libro al array
    addBook = (book) => {this.libros.push(book) };
    
    //genero un nuevo array solo con los titulos de los libros y los printeo
    getBookNames(){
        
        const nBooks = this.libros.map((titulo) =>  titulo.nombre)
         console.log(nBooks)
             
         
    };
}

//creo mi array
const usr = new Usuario("Sebastian","Devich",[{nombre : "El principito", autor : "Antoine de Saint-Exupéry" },{nombre : "Miguel de Cervantes", autor : "Autor 2"}], ["perro", "gato"]);



usr.addBook({nombre : "No queria pensar", autor : "yo"});
console.log(usr);
usr.getFullName();
usr.addMascotas("cabra");
console.log(usr);
usr.countMascotas();
usr.getBookNames();



const {promises: fs} = require('fs');


class Contendor{
    constructor (nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        
        
        
    }
    async save(obj){
        let data = null;
        let id= 0;
        let dataObj = null;
        
        try{
            data = await fs.readFile('./Productos.txt','utf-8')
            
        }catch(err){
            console.log(err)
        }
        if(data.length == 0){
            
            data = [{...obj,id}]
            id = 1;
        }else{
            dataObj = JSON.parse(data);
            
            id = dataObj.length +1;
           
            
        }
        const nObj = {id: id, ...usr};
        dataObj.push(nObj);
        fs.writeFile('./Productos.txt',JSON.stringify(dataObj));
        console.log("se asigno el ID:"+id)
    }
    async getById(id){
        let data = null;
        
        let dataObj = null;
       
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
        
        let dataObj = null;
       
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
        
        let dataObj = null;
       
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

const usr = new Contendor( "Ariel",  'Sotelo')

usr.save(usr)

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
        return console.log(nBooks)
             
         
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




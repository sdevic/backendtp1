const express = require('express');
const handlebars = require('express-handlebars');
const {Server} = require('socket.io');
const {options} = require('./options/mysqlconnection')
const { sqlliteOptions } = require('./options/sqlite3')
const path =  require('path');


const Contenedor = require('./managers/Contenedor');
const ContenedorChat = require('./managers/ContenedorChat')


const container = new Contenedor('productos', options)
const chatContainer = new ContenedorChat('chat', sqlliteOptions)
;

const viewsFolder = path.join(__dirname,"views");

const app = express();

container.crearTabla()
    .then(() => {
    chatContainer.crearTabla()
    .then(() => console.log('Tablas creadas'))
})

const PORT = 8000;



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"))

app.engine("handlebars", handlebars.engine());

app.set("views", viewsFolder);

app.set("view engine", "handlebars");
const server = app.listen(PORT, ()=>console.log(`Server Port ${PORT}`));
//Websocket

//Config websocket
const io = new Server(server);


//Detectar cada socket de un cliente que se conecte
io.on("connection", async(socket)=>{
    console.log("Nuevo cliente conectado");
    //Chat
    const chat = await chatContainer.getAll();
    socket.emit("messagesChat", chat);

    //Products
    const products = await container.getAll();
    socket.emit("products", products);

    //Recibir msg
    socket.on("newMsg", async(data)=>{
        await chatContainer.save(data)
        //enviar los mensajes a todos los socket conecta2
        const chat = await chatContainer.getAll();
        io.sockets.emit("messagesChat", chat)
    })

    //Recibir Producto
    socket.on("newProduct", async(data)=>{
        await container.save(data)
        //Enviar productos actualizados
        const products = await container.getAll();
        io.sockets.emit("products", products)
    })
})

app.get('/', (req,res) => {
    res.render("home")
})

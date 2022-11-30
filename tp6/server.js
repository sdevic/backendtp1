const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./tp6/public'))

const mensajes =[]
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'pug')
app.set("views", './tp6/views')
// get

app.get('/', (req, res) => {
    res.render('nivel', {productos})
})

// post

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
})

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')
    socket.emit('mensajes',mensajes)
    socket.on('mimensaje', data=>{
        mensajes.push({socketid: socket.id , mensaje: data})
       io.sockets.emit('mensajes',mensajes)
    })
  
    })

const PORT = 8080 
httpServer.listen(PORT, () => {
    console.log('escuchando en el 8080')
})
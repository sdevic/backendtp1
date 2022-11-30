const socket = io()

const input = document.querySelector('input')
document.querySelector('button').addEventListener('click',()=>{
    socket.emit('mimensaje',input.value)
    
})

socket.on('mensajes',data =>{
    const mensajesHtml = data
        .map(msj =>
            `SocketID: ${msj.socketid} dice: ${msj.mensaje}`
        )
        .join('<br>')
    document.querySelector('p').innerHTML = mensajesHtml
})
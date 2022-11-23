const express =require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let persona = ["seba","ana","martin"]

app.get('/api/personas',(req,res)=>{
    res.send(persona)
    console.log("wue")
})
app.post('/api/personas',(req,res)=>{
    const {nuevaPersona} = req.body
    persona.push(nuevaPersona)
    res.send("ok")
})

app.listen(8080,()=>{
    console.log('servidor conectado correctamente')
})
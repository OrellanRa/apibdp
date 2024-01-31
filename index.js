const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const PORT = 3000

const conexion = mysql.createConnection(
    {
    host:'db4free.net',
    database:'bdandroid',
    user:'usuariodepruebas',
    password:'superclave123'
    }
)

app.listen(PORT, () => {
    console.log(`Servidor compilador en el puerto ${PORT}`)
})

conexion.connect(error => {
    if(error) throw error
    console.log('Conexion exitosa, Podemos seguir')
})

app.get('/', (req,res) =>{
    res.send('Api Conectado, base de datos OK')
})

app.get('/lista', (req, res)=>{

    const consulta = "SELECT * FROM bdandroid.usuario;"

    conexion.query(consulta,(error,resultado)=>{
        if(error)
         return console.error(error.message)


            const obj = {}
           
            if(resultado.length > 0) {
                obj.lista = resultado
                res.json(obj)
            }
            else {
                res.json('No hay registro de clientes')
            }    
   
    });
})

app.get('/lista/:id', (req, res)=>{

    const {id} =req.params

    const consulta = `SELECT * FROM bdandroid.usuario WHERE id=${id};`

    conexion.query(consulta,(error,resultado)=>{
        if(error) 
            return console.error(error.message)

            if(resultado.length > 0) {
                console.log =("individuo encontrado")
                res.json(resultado)
            }
            else {
                res.json('No hay registro de clientes')
            }    
   
    })
})

app.post('/listaClientes/agregar', (req, res) =>{

    const usuario={
        id: req.body.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        sexo: req.body.sexo
    }
    const consulta=`INSERT INTO usuario(id,nombre,apellido,sexo)
    values(?,?,?,?)`
    conexion.query(consulta,[
        usuario.id,
        usuario.nombre,
        usuario.apellido,
        usuario.sexo], (error)=>{
            if(error) return console.error(error.message)
            res.json("cliente agrego lista")
            
        })

})
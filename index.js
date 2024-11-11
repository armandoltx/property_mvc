// const express = require('express') // extraemos el paquete usamos commonJS
import express from 'express' // extraemos el paquete usamos ECMAScript modules
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

// crea la funcion
const app = express() // lo asignamos a la var app

// Conexion a la base de datos
try {
  await db.authenticate()
  console.log('conexion correcta a la base de datos')
} catch (error) {
  console.log(error)
}

// Habilitar Pug
app.set('view engine', 'pug') // que tipo de engine usamos para la vista
app.set('views', './views') // que carpetas son las views

// Carpeta Publica
// el contenedor de los archivos estaticos y la carpeta que pueden abrir las personas que visitan el sitio web
app.use(express.static('public'))
// routing los diferentes end points que soporta nuestra app.
// app.get('/', usuarioRoutes) // get busca la ruta especifica por eso no encuentra nosotros
app.use('/auth', usuarioRoutes) // use busca la ruta q inicie con lo q esta en las comillas en este caso "/"


// Definir un puerto y arrancar el proyecto
const port= 4000

// escucha o conectate en el puerto y corre el callback
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`)
})
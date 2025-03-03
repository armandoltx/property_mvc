// const express = require('express') // extraemos el paquete usamos commonJS
import express from 'express' // extraemos el paquete usamos ECMAScript modules
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRoutes from './routes/usuarioRoutes.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'
import appRoutes from './routes/appRoutes.js'
import apiRoutes from './routes/apiRoutes.js'
import db from './config/db.js'

// crea la funcion
const app = express() // lo asignamos a la var app

// Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended: true}) )

// Habilitar Cookie Parser
app.use( cookieParser() )

// Habilitar CSRF
app.use( csrf({cookie: true}) )

// Conexion a la base de datos
try {
  await db.authenticate()
  db.sync()
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
app.use('/', appRoutes)
app.use('/auth', usuarioRoutes) // use busca la ruta q inicie con lo q esta en las comillas en este caso "/"
app.use('/', propiedadesRoutes)
app.use('/api', apiRoutes)

// Definir un puerto y arrancar el proyecto
const port= process.env.PORT || 4000

// escucha o conectate en el puerto y corre el callback
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`)
})
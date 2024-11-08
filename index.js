// const express = require('express') // extraemos el paquete usamos commonJS
import express from 'express' // extraemos el paquete usamos ECMAScript modules

// crea la funcion
const app = express() // lo asignamos a la var app

// routing los diferentes end points que soporta nuestra app.
app.get('/', (req, res) => {
  res.send('hello world')
})

// Definir un puerto y arrancar el proyecto
const port= 4000

// escucha o conectate en el puerto y corre el callback
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`)
})
import express from "express"

const router = express.Router()

// router.get('/', (req, res) => {
//   res.send('hello world')
// })

// router.post('/', (req, res) => {
//   res.send('hello world POST usar Postman')
// })

// es lo mismo q lo de arriba pero asi ahorramos espacio
router.route('/')
  .get((req, res) => {
    res.send('hello world')
  })

  .post((req, res) => {
    res.send('hello world POST usar Postman')
  })


router.get('/nosotros', (req, res) => {
  res.json({msg: "Hola mundo desde nosotros"})
})

export default router // cuando es export default lo podemos importar en otras partes con cualquier
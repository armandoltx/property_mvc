import express from "express"
import {formularioLogin, formularioRegistro, registrar, confirmarCuenta, formularioOlvidePassword} from "../controllers/usuarioController.js"

const router = express.Router()

router.get('/login', formularioLogin)

router.get('/registro', formularioRegistro)
router.post('/registro', registrar)

router.get('/confirmar-cuenta/:token', confirmarCuenta)

router.get('/olvide-password', formularioOlvidePassword)



export default router // cuando es export default lo podemos importar en otras partes con cualquier
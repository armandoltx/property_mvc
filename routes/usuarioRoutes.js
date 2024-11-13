import express from "express"
import {formularioLogin, formularioRegistro, registrar, confirmarCuenta, formularioOlvidePassword, resetPasword, comprobarToken, nuevoPassword} from "../controllers/usuarioController.js"

const router = express.Router()

router.get('/login', formularioLogin)

router.get('/registro', formularioRegistro)
router.post('/registro', registrar)

router.get('/confirmar-cuenta/:token', confirmarCuenta)

router.get('/olvide-password', formularioOlvidePassword)
router.post('/olvide-password', resetPasword)

// Alamcena el nuevo password
router.get('/olvide-password/:token', comprobarToken)
router.post('/olvide-password/:token', nuevoPassword)





export default router // cuando es export default lo podemos importar en otras partes con cualquier
import express from "express"
import {formularioLogin, formularioRegistro} from "../controllers/usuarioController.js"

const router = express.Router()

router.get('/login', formularioLogin)
router.get('/registro', formularioRegistro)



export default router // cuando es export default lo podemos importar en otras partes con cualquier
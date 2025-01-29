import express from 'express'
import { inicio, categoria, noEcontrado, buscador } from '../controllers/appController.js';

const router = express.Router()

// pagina de inicio
router.get('/', inicio)

// Categorias
router.get('/categorias/:id', categoria)

// Pagina 404
router.get('/404', noEcontrado);

//Buscador
router.post('/buscador', buscador)

export default router
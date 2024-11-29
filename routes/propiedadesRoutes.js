import express from "express"
import { body } from 'express-validator'
import { admin, crear, guardar } from '../controllers/propiedadController.js';

const router = express.Router()

router.get('/mis-propiedades', admin)
router.get('/propiedades/crear', crear)
router.post(
  '/propiedades/crear',
  // aqui es donde agregamos las validaciones en las rutas. tb pueden estar en el controlador.
  body('titulo').notEmpty().withMessage('El titulo del Anuncio es Obligatorio'),
  body('descripcion')
    .notEmpty()
    .withMessage('La descripcion no puede ir vacia')
    .isLength({ max: 200 })
    .withMessage('La descripcion es muy larga'),
  body('categoria').isNumeric().withMessage('Selecciona una categoria'), // pq estamos usando el id
  body('precio').isNumeric().withMessage('Selecciona un rango de precios'), // pq estamos usando el id
  body('habitaciones').isNumeric().withMessage('Selecciona un numero de habitaciones'), // pq estamos usando el id
  body('estacionamiento').isNumeric().withMessage('Selecciona un numero de estacionamientos'), // pq estamos usando el id
  body('wc').isNumeric().withMessage('Selecciona un numero de wc.'), // pq estamos usando el id
  body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
  guardar
);


export default router // cuando es export default lo podemos importar en otras partes con cualquier
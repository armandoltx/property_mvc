import express from "express"
import { body } from 'express-validator'
import {
  admin,
  crear,
  guardar,
  agregarImagen,
  almacenarImagen,
  editar,
  update,
  eliminar,
  mostrarPropiedad,
  enviarMensaje,
  verMensajes,
} from '../controllers/propiedadController.js';
import protegerRuta from "../middleware/protegerRuta.js"
import upload from "../middleware/subirImagen.js"
import identificarUsuario from "../middleware/identificarUsuario.js"

const router = express.Router()

router.get('/mis-propiedades', protegerRuta, admin)
router.get('/propiedades/crear', protegerRuta, crear);
router.post(
  '/propiedades/crear',
  protegerRuta,
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

router.get('/propiedades/agregar-imagen/:id', protegerRuta, agregarImagen) // agregamos el middleware para acceder al usuario

router.post('/propiedades/agregar-imagen/:id',
  protegerRuta,
  upload.single('imagen'),
  almacenarImagen
)

router.get('/propiedades/editar/:id',
  protegerRuta,
  editar
)

router.post(
  '/propiedades/editar/:id',
  protegerRuta,
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
  update
);

router.post('/propiedades/eliminar/:id',
  protegerRuta,
  eliminar
)

// Area Publica
router.get('/propiedad/:id',
  identificarUsuario,
  mostrarPropiedad
);

// Almacenar los mensajes
router.post('/propiedad/:id',
  identificarUsuario,
  body('mensaje').isLength({min: 10}).withMessage('El Mensaje no puede ir vacio o es muy corto.'),
  enviarMensaje
);

router.get('/mensajes/:id',
  protegerRuta,
  verMensajes
)


export default router // cuando es export default lo podemos importar en otras partes con cualquier
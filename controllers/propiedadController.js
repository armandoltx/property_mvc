import { validationResult } from 'express-validator';
import Precio from '../models/Precio.js';
import Categoria from '../models/Categoria.js';

const admin = (req, res) => {
  // res.send('Mis propiedades')
  res.render('propiedades/admin', {
    pagina: 'Mis Propiedades',
    barra: true,
  });
};

// Formulario para crear una nueva propiedad
const crear = async (req, res) => {
  console.log('desde crear')

  // Consultar Modelo de Precio y Categoria
  const [categorias, precios] = await Promise.all([
    // await para que termine el proceso antes de pasar a la siguiente linea
    Categoria.findAll(),
    Precio.findAll(),
  ]);

  res.render('propiedades/crear', {
    pagina: 'Crear Propiedad',
    barra: true,
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    datos: {}
  });
};

const guardar = async (req, res) => {
  // console.log("en guardar...")

  // Validacion que viene desde la ruta
  let resultado = validationResult(req)
  // Verificar que el resultado este vacio
  if(!resultado.isEmpty()) {
    // Consultar Modelo de Precio y Categoria
    const [categorias, precios] = await Promise.all([
      // await para que termine el proceso antes de pasar a la siguiente linea
      Categoria.findAll(),
      Precio.findAll(),
    ]);
    // Errores
    return res.render('propiedades/crear', {
      pagina: 'Crear Propiedad',
      barra: true,
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos: req.body
    });
  };
}

export {
  // es un export nombrado, hay q usar llaves y el mimso nombre cuando lo importas => import { formularioLogin } from '../../'
  admin,
  crear,
  guardar,
}

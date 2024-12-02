import { validationResult } from 'express-validator';
import { Precio, Categoria, Propiedad } from '../models/index.js'

const admin = (req, res) => {
  // res.send('Mis propiedades')
  res.render('propiedades/admin', {
    pagina: 'Mis Propiedades',
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
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos: req.body
    });
  };

  // Crear un registro si pasa las validaciones
  // console.log(req.body)
  const {
    titulo,
    descripcion,
    habitaciones,
    estacionamiento,
    wc,
    calle,
    lat,
    lng,
    precio,
    categoria: categoriaId,
  } = req.body;

  // console.log(req.usuario)
  const { id: usuarioId } = req.usuario // lo asignamos aqui a usuarioId y lo ponemos abajo solo

  try {
    const propiedadGuardada = await Propiedad.create({
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lat,
      lng,
      precioId: precio, // se puede hacer asi, o como esta categoria
      categoriaId,
      usuarioId, // lo ponemos aqui
      imagen: ''
    })
  } catch (error) {
    console.log(error)
  }
}

export {
  // es un export nombrado, hay q usar llaves y el mimso nombre cuando lo importas => import { formularioLogin } from '../../'
  admin,
  crear,
  guardar
};

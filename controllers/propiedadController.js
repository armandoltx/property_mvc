import { validationResult } from 'express-validator';
import { Precio, Categoria, Propiedad, Usuario } from '../models/index.js'

const admin = async (req, res) => {
  // res.send('Mis propiedades')
  // cogemos al usuario
  const { id } = req.usuario

  // nos traemos todas las propiedades del usuario
  const propiedades = await Propiedad.findAll({
    where: { usuarioId: id },
    include: [
      { model: Categoria, as: 'categoria' }, // para poder ensenar en la vista las categorias, pq las tenemos relacionadas con la Id, le agregamos el alias para usarla en la vista
      { model: Precio, as: 'precio' }
    ]
  })

  res.render('propiedades/admin', {
    pagina: 'Mis Propiedades',
    propiedades
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

    const { id } = propiedadGuardada
    res.redirect(`/propiedades/agregar-imagen/${id}`)
  } catch (error) {
    console.log(error)
  }
}

const agregarImagen = async (req, res) => {
  // res.send('agregando imagen...')

  //Validar q la propiedad exista
  // console.log(req.params)
  const { id } = req.params;

  const propiedad = await Propiedad.findByPk(id);
  // console.log(propiedad)
  if (!propiedad) {
    return res.redirect('/mis-propiedades');
  }

  // Validar que la propiedad no este publicada
  if (propiedad.publicado) {
    return res.redirect('/mis-propiedades');
  }

  // Validar que la propiedad pertecene a quien visita la pagina\
  // console.log(req.usuario)
  // console.log(req.usuario.id.toString() === propiedad.usuarioId.toString())
  if(req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect('/mis-propiedades');
  }

  res.render('propiedades/agregar-imagen', {
    pagina: `Agregar Imagen a ${propiedad.titulo}`,
    csrfToken: req.csrfToken(),
    propiedad
  });
}

const almacenarImagen = async (req, res) => {
  //Validar q la propiedad exista
  // console.log(req.params)
  const { id } = req.params;

  const propiedad = await Propiedad.findByPk(id);
  // console.log(propiedad)
  if (!propiedad) {
    return res.redirect('/mis-propiedades');
  }

  // Validar que la propiedad no este publicada
  if (propiedad.publicado) {
    return res.redirect('/mis-propiedades');
  }

  // Validar que la propiedad pertecene a quien visita la pagina\
  // console.log(req.usuario)
  // console.log(req.usuario.id.toString() === propiedad.usuarioId.toString())
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect('/mis-propiedades');
  }

  try {
    // Almacenar la imagen y publicar propiedad
    console.log(req.file)
    propiedad.imagen = req.file.filename
    propiedad.publicado = 1
    await propiedad.save()

  } catch (error) {
    console.log(error)
  }
}

export {
  // es un export nombrado, hay q usar llaves y el mimso nombre cuando lo importas => import { formularioLogin } from '../../'
  admin,
  crear,
  guardar,
  agregarImagen,
  almacenarImagen,
};

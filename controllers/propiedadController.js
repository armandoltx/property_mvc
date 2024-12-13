import { unlink } from 'node:fs/promises'
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
    csrfToken: req.csrfToken(),
    propiedades,
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

const editar = async (req, res) => {
  console.log("desde editar")

  const { id } = req.params

  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);
  if (!propiedad) {
    return res.redirect('/mis-propiedades');
  }

  // Revisar qquien visita la URL es quien creo la propiedad
  // console.log(req.usuario)
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect('/mis-propiedades');
  }

  // Consultar Modelo de Precio y Categoria
  const [categorias, precios] = await Promise.all([
    // await para que termine el proceso antes de pasar a la siguiente linea
    Categoria.findAll(),
    Precio.findAll(),
  ]);

  res.render('propiedades/editar', {
    pagina: `Editar Propiedad: ${propiedad.titulo}`,
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    datos: propiedad,
  });
}

const update = async (req, res) => {
  console.log('guardando cambios');

  // Verificar la validacion
  // Validacion que viene desde la ruta
  let resultado = validationResult(req);

  // Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    // Consultar Modelo de Precio y Categoria
    const [categorias, precios] = await Promise.all([
      // await para que termine el proceso antes de pasar a la siguiente linea
      Categoria.findAll(),
      Precio.findAll(),
    ]);
    // Errores
    return res.render('propiedades/editar', {
      pagina: "Editar Propiedad",
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos: req.body, // va a ser la ultima copia, q no estara en la BD
    });
  }

  // Validar que la propiedad exista
  const { id } = req.params;
  const propiedad = await Propiedad.findByPk(id);
  if (!propiedad) {
    return res.redirect('/mis-propiedades');
  }

  // Revisar qquien visita la URL es quien creo la propiedad
  // console.log(req.usuario)
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect('/mis-propiedades');
  }

  // Reescribie el objeto y actualizarlo

  try {
    // console.log(propiedad);
    const {
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lat,
      lng,
      precio: precioId,
      categoria: categoriaId,
    } = req.body;

    propiedad.set({
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lat,
      lng,
      precioId,
      categoriaId
    });

    await propiedad.save()

    res.redirect('/mis-propiedades')

  } catch (error) {
    console.log(error)
  }
}

const eliminar = async (req, res) =>{
  // console.log('eliminando...')
  // Validar que la propiedad exista
  const { id } = req.params;
  const propiedad = await Propiedad.findByPk(id);
  if (!propiedad) {
    return res.redirect('/mis-propiedades');
  }

  // Revisar qquien visita la URL es quien creo la propiedad
  // console.log(req.usuario)
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect('/mis-propiedades');
  }

  // Eliminar la imagen asociada
  if(propiedad.imagen) await unlink(`public/uploads/${propiedad.imagen}`)



  // Eliminar la propiedad
  await propiedad.destroy()
  res.redirect('/mis-propiedades');
}

// Muestra una propiedad
const mostrarPropiedad = async (req, res) => {
  // res.send("mostrando...")
  const { id } = req.params;
  // Comprobar q la propiedad exista
  const propiedad = await Propiedad.findByPk(id, {
    include: [
      { model: Categoria, as: 'categoria' }, // para poder ensenar en la vista las categorias, pq las tenemos relacionadas con la Id, le agregamos el alias para usarla en la vista
      { model: Precio, as: 'precio' },
    ]
  });
  // console.log(propiedad)
  if (!propiedad) {
    return res.redirect('/404');
  }

  res.render('propiedades/mostrar', {
    pagina: propiedad.titulo,
    propiedad,
  });
}

export {
  // es un export nombrado, hay q usar llaves y el mimso nombre cuando lo importas => import { formularioLogin } from '../../'
  admin,
  crear,
  guardar,
  agregarImagen,
  almacenarImagen,
  editar,
  update,
  eliminar,
  mostrarPropiedad
};

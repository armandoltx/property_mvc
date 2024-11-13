import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'
import { generarId } from '../helpers/token.js'
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js'

const formularioLogin = (req, res) => {
  res.render('auth/login', {
    pagina: 'Iniciar Sesion',
    autenticado: true
  }) //como le hemos dicho q las vistas estan en la carpeta views en index.js solo hay q poner el path sin esa carperta
}

const formularioRegistro = (req, res) => {
  res.render('auth/registro', {
    pagina: 'Crea tu cuenta',
    csrfToken: req.csrfToken()

  })
}

const registrar = async(req, res) => {
  // console.log('registrando...') // imprime en el terminal
  // console.log(req.body)

  // Extraer los datos
  const { nombre, email, password } = req.body

  // Validación
  await check('nombre').notEmpty().withMessage('El Nombre no puede ir vacio').run(req)
  await check('email').isEmail().withMessage('Eso no parece un email').run(req)
  await check('password').isLength({ min: 6 }).withMessage('El Password debe ser de al menos 6 caracteres').run(req)
  await check('repetir_password').equals(password).withMessage('Los Passwords no son iguales').run(req)

  let resultado = validationResult(req)
  // res.json(resultado.array())

  // Verificar que el resultado este vacio
  if(!resultado.isEmpty()) {
    // Errores
    return res.render('auth/registro', {
      pagina: 'Crear Cuenta',
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email
      }
    })
  }

  // Verificar que el usuario no este duplicado
  const existeUsuario = await Usuario.findOne( { where: { email } } )
  // console.log(existeUsuario)
  if(existeUsuario) {
    return res.render('auth/registro', {
      pagina: 'Crear Cuenta',
      csrfToken: req.csrfToken(),
      errores: [{ msg: 'El email ya existe' }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email
      }
    })
  }

  // Crear el usuario
  const usuario = await Usuario.create({
    nombre, // lo podemos pasar asi pq hemos destructurado anteriormente
    email,
    password,
    token: generarId()
  })
  // res.json(usuario)

  // Envia email de confirmacion
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token
  })

  // Mostrar mensaje de confirmacion de creacion del usuario
  res.render('templates/mensaje', {
    pagina: 'Cuenta Creada Correctamente',
    mensaje: 'Hemos enviado un Email de Confirmacion, presiona el enlace.'
  })
}

// funcion que comprueba una cuenta
const confirmarCuenta = async (req, res) => {
  // console.log('comprobando....')
  // console.log(req.params.token)

  // verificar el token es valido
  const usuario = await Usuario.findOne( { where: {token: req.params.token} } )

  // mensaje si no hay usuario
  if(!usuario) {
    res.render('auth/confirmar-cuenta', {
      pagina: 'Error al confirmar tu cuenta',
      mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
      error: true
    })
  }

  // Confirmar cuenta si hay usuario
  usuario.token = null;
  usuario.confirmado = true
  await usuario.save()

  res.render('auth/confirmar-cuenta', {
    pagina: 'Cuenta Confirmada',
    mensaje: 'La cuenta se confirmo correctamente'
  })

}

const formularioOlvidePassword = (req, res) => {
  res.render('auth/olvide-password', {
    pagina: 'Recupera tu acceso',
    csrfToken: req.csrfToken(),
  })
}

const resetPasword = async (req, res) => {
  // Validación
  await check('email').isEmail().withMessage('Eso no parece un email').run(req)

  let resultado = validationResult(req)

  // Verificar que el resultado este vacio
  if(!resultado.isEmpty()) {
    // Errores
    return res.render('auth/olvide-password', {
      pagina: 'Recupera tu acceso a Property',
      csrfToken : req.csrfToken(),
      errores: resultado.array()
    })
  }

  // Buscar el usuario

  const { email } = req.body
  const usuario = await Usuario.findOne({ where: { email } } )
  if(!usuario) {
    return res.render('auth/olvide-password', {
      pagina: 'Recupera tu acceso a Property',
      csrfToken : req.csrfToken(),
      errores: [{msg: 'El Email no Pertenece a ningún usuario'}]
    })
  }

  // Generar un token y enviar el email
  usuario.token = generarId();
  await usuario.save();

  // Enviar un email
  emailOlvidePassword({
    email: usuario.email,
    nombre: usuario.nombre,
    token: usuario.token
  })

  // Mostrar mensaje de confirmación
  res.render('templates/mensaje', {
    pagina: 'Reestablece tu Password',
    mensaje: 'Hemos enviado un email con las instrucciones'
  })
}

const comprobarToken = (req, res, next) => {
  next()
}

const nuevoPassword = (req, res) => {}


export {  // es un export nombrado, hay q usar llaves y el mimso nombre cuando lo importas => import { formularioLogin } from '../../'
  formularioLogin,
  formularioRegistro,
  registrar,
  confirmarCuenta,
  formularioOlvidePassword,
  resetPasword,
  comprobarToken,
  nuevoPassword
}
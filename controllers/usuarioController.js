import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'

const formularioLogin = (req, res) => {
  res.render('auth/login', {
    pagina: 'Iniciar Sesion',
    autenticado: true
  }) //como le hemos dicho q las vistas estan en la carpeta views en index.js solo hay q poner el path sin esa carperta
}

const formularioRegistro = (req, res) => {
  res.render('auth/registro', {
    pagina: 'Crea tu cuenta'

  })
}

const registrar = async(req, res) => {
  // console.log('registrando...') // imprime en el terminal
  // console.log(req.body)

      // Validación
    await check('nombre').notEmpty().withMessage('El Nombre no puede ir vacio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({ min: 6 }).withMessage('El Password debe ser de al menos 6 caracteres').run(req)
    await check('repetir_password').equals('password').withMessage('Los Passwords no son iguales').run(req)

    let resultado = validationResult(req)
    // res.json(resultado.array())

    // Verificar que el resultado este vacio
    if(!resultado.isEmpty()) {
      // Errores
      return res.render('auth/registro', {
        pagina: 'Crear Cuenta',
        errores: resultado.array(),
        usuario: {
          nombre: req.body.nombre,
          email: req.body.email
        }
      })
    }



  const usuario = await Usuario.create(req.body)
  res.json(usuario)
}

const formularioOlvidePassword = (req, res) => {
  res.render('auth/olvide-password', {
    pagina: 'Recupera tu acceso'

  })
}

export {  // es un export nombrado, hay q usar llaves y el mimso nombre cuando lo importas => import { formularioLogin } from '../../'
  formularioLogin,
  formularioRegistro,
  registrar,
  formularioOlvidePassword
}
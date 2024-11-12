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
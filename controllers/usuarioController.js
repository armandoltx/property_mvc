
const formularioLogin = (req, res) => {
  res.render('auth/login', {
    autenticado: true
  }) //como le hemos dicho q las vistas estan en la carpeta views en index.js solo hay q poner el path sin esa carperta
}

const formularioRegistro = (req, res) => {
  res.render('auth/registro', {
    pagina: 'Crea tu cuenta'

  })
}

export {  // es un export nombrado, hay q usar llaves y el mimso nombre cuando lo importas => import { formularioLogin } from '../../'
  formularioLogin,
  formularioRegistro
}
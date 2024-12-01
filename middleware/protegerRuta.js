import jwt from 'jsonwebtoken'
import { Usuario } from '../models/index.js'

const protegerRuta = async (req, res, next) => {
  // console.log('desde el middleware')
  // Verificar si hay un toque
  // console.log(req.cookies._token)
  const { _token } = req.cookies
  if(!_token) {
    return res.redirect('/auth/login')
  }

  // Comprobar si hay un token
  try {
    // si hay token
    const decoded = jwt.verify(_token, process.env.JWT_SECRET) // verify comprueba el token
    // console.log(decoded)

    // se busca al usuario
    const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id);
    // console.log(usuario)

    // Almacenar el usuario al Request para q este disponible en distintas rutas
    if(usuario) {
      req.usuario = usuario
    } else {
      return res.redirect('/auth/login')
    }
    return next()

  } catch (error) {
    return res.clearCookie('_token').redirect('/auth/login')
  }
}

export default protegerRuta
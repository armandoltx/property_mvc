// comprobar si un usuario esta autenticado.
import jwt from 'jsonwebtoken' // un usuario autenticado va a tener un token
import Usuario from '../models/Usuario.js'

const identificarUsuario = async (req, res, next) => {
  // Identificar si hay token, sino es q el usuario no tiene cuenta o no esta autenticado
  const {_token} = req.cookies
  if(!_token) {
    req.usuario = null
    return next()
  }
  // Comprobar el token
  try {
    const decoded = jwt.verify(_token, process.env.JWT_SECRET);
    const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id);

    if (usuario) {
      req.usuario = usuario;
    }
    return next();

  } catch (error) {
    console.log(error)
    return res.clearCookie('_token').redirect('/auth/login');
  }
}

export default identificarUsuario
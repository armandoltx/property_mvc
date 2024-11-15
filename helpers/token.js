import jwt from 'jsonwebtoken'

const generarId = () => Math.random().toString(32).substring(2) + Date.now().toString(32)

const generarJWT = (datos) => {
  // console.log("0000000")
  return jwt.sign({
    id : datos.id,
    nombre: datos.nombre
  }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })
}

export {
  generarId,
  generarJWT
}

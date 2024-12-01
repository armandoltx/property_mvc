import { DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import db from '../config/db.js'

const Usuario = db.define('usuarios', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false  // el campo no puede ir vacio
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: DataTypes.STRING,
  confirmado: DataTypes.BOOLEAN
}, {
  hooks: { // son funciones que puedes agregar al modelo
    beforeCreate: async function(usuario) { // este codigo se ejecuta anres de crear la instancia
      const salt = await bcrypt.genSalt(10) // con estas 2 lineas hasheamos el pass
      usuario.password = await bcrypt.hash( usuario.password, salt);
    }
  },
  scopes: { // te sirven para eliminar ciertos campos cuando haces una consulta
    eliminarPassword: {
      attributes: {
        exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt']
      }
    }
  }
})

// Metodos personalizados:

/// Comprobar password registrando tus propios prototypes, q son las funciones q les puedes aplicar, se ven en la consola del browser.
Usuario.prototype.verificarPassword = function(password) {
  return bcrypt.compareSync(password, this.password)  // password es el q se pasa como parametro, this.password es el de la BD
}

export default Usuario

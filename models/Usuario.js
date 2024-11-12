import { DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import db from '../config/db.js'

const Usuario = db. define('usuarios', {
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
  hooks: {
    beforeCreate: async function(usuario) { // este codigo se ejecuta anres de crear la instancia
      const salt = await bcrypt.genSalt(10) // con estas 2 lineas hasheamos el pass
      usuario.password = await bcrypt.hash( usuario.password, salt);
    }
  }
})

export default Usuario

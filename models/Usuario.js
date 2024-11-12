import { DataTypes } from 'sequelize'
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
})

export default Usuario

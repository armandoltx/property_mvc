import { DataTypes } from 'sequelize';
import db from '../config/db.js';


const Propiedad = db.define('propiedades', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  titulo: {
    // son los names en los campos del formulario
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    // son los names en los campos del formulario
    type: DataTypes.TEXT,
    allowNull: false,
  },
  habitaciones: {
    // son los names en los campos del formulario
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estacionamiento: {
    // son los names en los campos del formulario
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  wc: {
    // son los names en los campos del formulario
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  calle: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  lat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lng: {
    // son los names en los campos del formulario
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen: {// son los names en los campos del formulario
    type: DataTypes.STRING,
    allowNull: false,
  },
  publicado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

export default Propiedad
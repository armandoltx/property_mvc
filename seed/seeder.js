import { exit } from 'node:process'
import categorias from './categorias.js'
import precios from './precios.js';
import Categoria from '../models/Categoria.js';
import Precio from '../models/Precio.js'
import db from '../config/db.js'

const importarDatos = async () => {
  try {
    // Autenticar
    await db.authenticate();

    // Generar las Columnas
    await db.sync();

    // Insertamos los datos
    await Promise.all([
      Categoria.bulkCreate(categorias),
      Precio.bulkCreate(precios)
    ])

    console.log('Datos Importados Correctamente');
    exit(); // copn 0 o nada es q termina el proceso correctamente
  } catch (error) {
    console.log(error);
    exit(1); // finaliza el proceso. le pasamos el 1, pq hubo un error
  }
};

const eliminarDatos = async () => {
  try {
    await db.sync({ force: true });
    console.log('Datos Eliminados Correctamente');
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

if (process.argv[2] === '-i') {
  importarDatos();
}

if (process.argv[2] === '-e') {
  eliminarDatos();
}

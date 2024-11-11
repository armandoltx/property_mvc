import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS ?? '', {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5,  // maximo de conexiones
        min: 0,  // minimo de conexiones
        acquire: 30000,  // tiempo q espra q se conecte antes de marcar un error
        idle: 10000 // tiempo q debe transcurrir sin q pase nada para terminar la conexion
    },
    operatorAliases: false
});

export default db;

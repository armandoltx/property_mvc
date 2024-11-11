import Sequelize from 'sequelize'

const db = new Sequelize('property_node_mvc', 'root', '', {
    host: 'localhost',
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

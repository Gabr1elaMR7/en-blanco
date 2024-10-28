const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '172.17.153.204', // Cambia esto si es necesario
    user: 'cable',
    password: 'Claro2024*+', // Asegúrate de que sea la contraseña correcta
    database: 'r_phy',
    port: 3306,
    connectTimeout: 100

});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos como ID ' + connection.threadId);
});

module.exports = connection;


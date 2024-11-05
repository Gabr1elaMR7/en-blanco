const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '172.17.153.204', // Cambia esto si es necesario
    user: 'cable',
    password: 'Claro2024*+', // Asegúrate de que sea la contraseña correcta
    database: 'r_phy',
    port: 3306,
    connectTimeout: 10000

});

// Función para manejar la reconexión
function handleDisconnect() {
    connection.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos: ' + err.stack);
            setTimeout(handleDisconnect, 2000); // Reintentar después de 2 segundos
        } else {
            console.log('Conectado a la base de datos como ID ' + connection.threadId);
            // Enviar una consulta cada minuto para mantener la conexión
            setInterval(() => {
                connection.query('SELECT 1', (err) => {
                    if (err) {
                        console.error('Consulta de keep-alive fallida:', err);
                    }
                });
            },   60000); // Cada 60 segundos
        }
    });

    connection.on('error', (err) => {
        console.error('Error de conexión MySQL:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Reconectar si se pierde la conexión
        } else {
            // Manejar otros errores según sea necesario
            console.error('Error no manejado:', err);
        }
    });
}

// Iniciar el manejo de desconexiones
handleDisconnect();

module.exports = connection;


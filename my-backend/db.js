const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '172.17.153.204', 
    user: 'cable',
    password: 'Claro2024*+', 
    database: 'r_phy',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,  
    queueLimit: 0,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    keepAliveInitialDelay: 10000 // Tiempo de espera para iniciar keepAlive (ms)
});



function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// Ejemplo de uso de la función query
async function exampleUsage() {
    try {
        const results = await query('SELECT * FROM equipos_grafana'); 
        console.log('Resultados de la consulta:', results);
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
    }
}

// Llamada a la función de ejemplo para probar la conexión
exampleUsage();

// Exportar el pool y la función query para uso en otros módulos
module.exports = { pool, query };





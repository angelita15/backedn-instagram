const getConnection = require('./getConnection');

async function main() {
    // Variable que almacenará una conexión libre de la base de datos.
    let connection;

    try {
        // Obtenemos una conexión libre.
        connection = await getConnection();

        console.log('Borrando tablas existentes...');

        await connection.query('DROP TABLE IF EXISTS users');
        await connection.query('DROP TABLE IF EXISTS posts');

        console.log('Creando tablas...');

        await connection.query(`
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                modifiedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE posts (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                idUser INTEGER NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users(id),
                text VARCHAR(280) NOT NULL,
                image VARCHAR(100),
                modifiedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error(err);
    } finally {
        // Si existe una conexión la liberamos.
        if (connection) connection.release();

        // Cerramos el proceso actual.
        process.exit();
    }
}

// Llamamos a la función principal.
main();

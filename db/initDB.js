const getConnection = require('./getConnection');

async function main() {
    let connection;

    try {
        connection = await getConnection();

        console.log('Borrando tablas existentes...');
        await connection.query('DROP TABLE IF EXISTS posts');
        await connection.query('DROP TABLE IF EXISTS users');
        await connection.query('DROP TABLE IF EXISTS userVotes');

        console.log('Creando tablas...');

        await connection.query(`
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                modifiedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
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
                modifiedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
        CREATE TABLE userVotes (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            idUser INTEGER NOT NULL,
            idPost INTEGER NOT NULL,
            FOREIGN KEY (idUser) REFERENCES users(id),
            FOREIGN KEY (idPost) REFERENCES posts(id),
            vote BOOLEAN DEFAULT true,
            modifiedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release();

        process.exit();
    }
}

main();

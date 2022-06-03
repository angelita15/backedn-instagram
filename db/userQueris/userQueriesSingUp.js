const bcrypt = require('bcrypt');
const getConnection = require('../getConnection');

const { generateError } = require('../../helpers')

const singUptUserQuery = async (email, password) => {
    let connection;

    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        if (users.length > 0) {
            throw generateError(
                'Ya existe un usuario con ese email en la base de datos',
                409
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await connection.query(
            `INSERT INTO users (email, password) VALUES(?, ?)`,
            [email, hashedPassword]
        );

        return newUser.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = singUptUserQuery;


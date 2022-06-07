const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectPostByIdQuery = async (idPost) => {
    let connection;

    try {
        connection = await getConnection();

        const [posts] = await connection.query(
            `
            SELECT T.id, T.idUser, T.text, T.image, T.createdAt, U.email
            FROM posts T
            LEFT JOIN users T
            ON T.idUser = U.id
            WHERE T.id = ?
            `,
            [idPost]
        );

        if (posts.length < 1) {
            throw generateError('Post not found', 404);
        }

        return posts[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectPostByIdQuery;

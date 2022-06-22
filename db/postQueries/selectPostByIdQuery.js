const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const selectPostByIdQuery = async (idPost) => {
    let connection;

    try {
        connection = await getConnection();

        const [posts] = await connection.query(
            `
            SELECT P.id, P.idUser, P.text, P.image, P.createdAt, U.username
            FROM posts P
            LEFT JOIN users U
            ON P.idUser = U.id
            WHERE P.id = ?
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

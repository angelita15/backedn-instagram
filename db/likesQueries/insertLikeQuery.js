const getConnection = require('../getConnection');

const insertLikeQuery = async (idPost, like = false) => {
    let connection;

    try {
        connection = await getConnection()

        await connection.query(
            `
              INSERT INTO likes (idPost, like)
              VALUES (?, ?)
            `,
            [idPost, like]

        );

    } finally {
        if (connection) connection.release()
    }


}
module.exports = insertLikeQuery;
const getConnection = require('../getConnection');

const selectAllPostsQuery = async (keyword) => {
    let connection;

    try {
        connection = await getConnection();

        let posts;

        if (keyword) {
            [posts] = await connection.query(
                `
                    SELECT P.id, P.idUser, P.text, P.image, P.createdAt, U.email
                    FROM posts P
                    LEFT JOIN users U 
                    ON P.idUser = U.id
                    WHERE P.text LIKE ?
                    ORDER BY P.createdAt DESC
                `,
                [`%${keyword}%`]
            );
        } else {
            [posts] = await connection.query(
                `
                    SELECT P.id, P.idUser, P.text, P.image, P.createdAt, U.email
                    FROM posts P
                    LEFT JOIN users U 
                    ON P.idUser = U.id
                    ORDER BY P.createdAt DESC
                `
            );
        }

        return posts;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllPostsQuery;

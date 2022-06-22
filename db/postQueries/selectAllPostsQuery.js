const getConnection = require('../getConnection');

const selectAllPostsQuery = async (keyword) => {
    let connection;

    try {
        connection = await getConnection();

        let posts;

        if (keyword) {
            [posts] = await connection.query(
                `
                    SELECT P.id, P.idUser, O.username, P.image, P.text, SUM(IFNULL(U.vote = 1, 0)) AS likes, P.createdAt
                    FROM posts P
                    LEFT JOIN users O
                    ON P.idUser = O.id
                    LEFT JOIN userVotes U
                    ON P.id = U.idPost
                    WHERE P.text LIKE ?
                    GROUP BY P.id
                    ORDER BY P.createdAt DESC
                `,
                [`%${keyword}%`]
            );
        } else {
            [posts] = await connection.query(
                `
                    SELECT P.id, P.idUser, O.username, P.image, P.text, SUM(IFNULL(U.vote = 1, 0)) AS likes, P.createdAt
                    FROM posts P
                    LEFT JOIN users O
                    ON P.idUser = O.id
                    LEFT JOIN userVotes U
                    ON P.id = U.idPost
                    GROUP BY P.id
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

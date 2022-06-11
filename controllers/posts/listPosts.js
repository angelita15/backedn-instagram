const selectAllPostsQuery = require('../../db/postQueries/selectAllPostsQuery');

const listPosts = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        const posts = await selectAllPostsQuery(keyword);

        res.send({
            status: 'ok',
            data: {
                posts,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listPosts;

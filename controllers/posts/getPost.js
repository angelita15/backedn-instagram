const selectPostByIdQuery = require('../../db/postQueries/selectPostByIdQuery');

const getPost = async (req, res, next) => {
    try {
        const { idPost } = req.params;

        const post = await selectPostByIdQuery(idPost);

        res.send({
            status: 'ok',
            data: {
                post,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getPost;

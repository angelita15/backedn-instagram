const insertLikeQuery = require('../../db/likesQueries/insertLikeQuery')

const newLike = async (req, res, next) => {
    try {

        const { idPost } = req.params;

        const vote = await insertLikeQuery(idPost, req.idUser)

        const message = vote ? "like creado" : "like eliminado"

        res.send({
            status: 'ok',
            message
        });
    } catch (err) {
        next(err);
    }


}


module.exports = newLike;

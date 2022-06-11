const signUptUserQuery = require('../../db/userQueries/userQueriesSignUp');
const { generateError } = require('../../helpers');

const signUp = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw generateError('Faltan campos', 400);
        }

        const idUser = await signUptUserQuery(email, password);

        res.send({
            status: 'ok',
            message: `Usuario con id ${idUser} creado`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = signUp;

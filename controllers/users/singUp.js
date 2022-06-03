const singUptUserQuery = require('../../db/userQueris/userQueriesSingUp');

const { generateError } = require('../../helpers');

const singUp = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw generateError('Faltan campos', 400);
        }

        const idUser = await singUptUserQuery(email, password);

        res.send({
            status: 'ok',
            message: `Usuario con id ${idUser} creado`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = singUp;

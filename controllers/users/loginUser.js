const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const selectUserByEmailQuery = require('../../db/userQueries/selectUserByEmailQuery');
const { generateError } = require('../../helpers');

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw generateError('Faltan campos', 400);
        }

        // We get the user by email //
        const user = await selectUserByEmailQuery(email);

        // Checking if password is correct //
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            await generateError('Contraseña incorrecta', 401);
        }

        const payload = {
            id: user.id,
        };

        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '30d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;

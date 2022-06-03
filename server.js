require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const { singUp } = require('./controllers/users/singUp');

const { PORT } = process.env;

const app = express();

app.use(morgan('dev'));

app.use(express.json());

// controllers //

const { loginUser } = require('./controllers/users/loginUser');

app.post('/login', loginUser);

// Middleware not found

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

//endpoint POST [/singUp] Registro de usuario
app.post('/user', singUp);

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found!',
    });
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

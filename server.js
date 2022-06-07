require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const { PORT } = process.env;

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(fileUpload());

const authUser = require('./middlewares/authUser');

// controllers //

const { loginUser, signUp, getUser } = require('./controllers/users');

app.post('/login', loginUser); // ruta login

app.get('/user/:idUser', getUser);

// Middleware not found

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});
/////////////////////////////

//endpoint POST [/singUp] Registro de usuario
app.post('/user', signUp); //ruta crear usuario

// endpoints Posts
const { newPost } = require('./controllers/posts/');

app.post('/posts', authUser, newPost);

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found!',
    });
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

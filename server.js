require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const { PORT } = process.env;

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(fileUpload());

/* ###### Middlewares Authorization ########*/

const authUser = require('./middlewares/authUser');

/* ###### Endpoints USERS  ########*/

const { loginUser, signUp, getUser } = require('./controllers/users');

// Registro de nuevo usuario //
app.post('/user', signUp);

// Login de usuario //
app.post('/login', loginUser);

// Obtenemos información de un usuario //
app.get('/user/:idUser', getUser);

/* ###### Endpoints POSTS  ########*/

const { newPost, getPost, listPosts } = require('./controllers/posts/');

// Crear nuevo post //
app.post('/posts', authUser, newPost);

// Obtenemos todos los posts //
app.get('/posts', listPosts);

// Obtenemos post en específico con una ID //
app.get('/posts/:idPost', getPost);

/* ###### Endpoints Likes  ########*/

const newLike = require('./controllers/likes');

// Función de poner y quitar like //
app.post('/post/:idPost/like', authUser, newLike);

/* ###### Middlewares Error ########*/
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

/* ###### Middlewares Not Found ########*/
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found!',
    });
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

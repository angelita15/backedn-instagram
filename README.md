# Intagram App

Implementar una API que permita publicar fotos (añadiendo o no textos) y que otras
personas puedan verlas.

# Instalar

# Entidades en la base de datos

[users] - usuario registrado

    - id
    - name
    - email
    - password
    - createdAt
    - modifiedAt

[post]
    -id
    -idUser
    -image
    -text
    -createdAt
    -modifiedAt

[commentarios]
    -idUser
    -text
    -createdAt
    -modifiedAt

[perfil] ¿?
    -id
    -idUser
    -image
    -text
    -createdAt
    -modifiedAt

# Endpoints clientes (usuarios anónimos)

POST [/users] - Registro de usuario

POST [/login] - Login de usuario (devuelve token)

# Endpoints (usuarios normales registrado)

GET [/users/:id] - Devuelve información de usuario

POST [/post] - Permite crear un post (necesita cabecera con token)

GET [/post] - Lista todos los post

GET [/post/:idPost] - Devuelve un post

DELETE [/post/:id] - Borra un post solo si eres quien lo creó (necesita cabecera con token)

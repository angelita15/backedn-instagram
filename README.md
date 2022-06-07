# Intagram App

Implementar una API que permita publicar fotos (añadiendo o no textos) y que otras
personas puedan verlas.

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

[perfil]
-id
-idUser
-image
-text
-createdAt
-modifiedAt

# Endpoints clientes (usuarios anónimos)

-   GET [/user] - mostrar el perfil de usuarios noseria solo user ✅

-   GET [/post] - mostras ULTIMAS publicaciones ✅

-   GET [/post/:idPost] -buscar una publicacion ✅

-   POST [/login] - inicio sesion (devuelve token) ✅

-   POST [/signUp] Registro de usuario ✅

# Endpoints (usuarios normales registrado)

POST [/post] - Permite crear un post (necesita cabecera con token) (✅)

DELETE [/post/:idPost] - Borra un post solo si eres quien lo creó (necesita cabecera con token) (OPCIONAL)

PUT [/user/:idUser] - Modificar perfil de usuario OPCIONAL 

POST [/post/:idPost/comment] crea un comentario  OPCIONAL 

post [/post/:idPost/like] darle un like 

usurio y post y si se necesita token

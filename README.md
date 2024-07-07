# Taller de Desarrollo Web - Proyecto ecommerce de alimentos próximos a vencer

Food Saver es una plataforma desarrollada en Node.js que aprovecha Express, MongoDB y Jade para facilitar operaciones CRUD, centrándose en la simplicidad y funcionalidad en la gestión de datos de alimentos próximos a vencer. Utilizando el patrón MVC (Modelo-Vista-Controlador), ofrece una experiencia robusta tanto para vendedores como para consumidores, permitiendo la compra y venta de productos alimenticios de calidad a precios reducidos.  Este proyecto no solo busca reducir el desperdicio alimentario, sino también promover un consumo más responsable y sostenible.

## Dependencias

- [Express](https://www.npmjs.com/package/express): Marco web rápido y minimalista para Node.js.
- [Morgan](https://www.npmjs.com/package/morgan): Middleware para la generación de registros de solicitudes HTTP.
- [Dotenv](https://www.npmjs.com/package/dotenv): Carga variables de entorno desde un archivo `.env`.
- [Bcrypt](https://www.npmjs.com/package/bcrypt): Biblioteca para el cifrado de contraseñas.
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser): Middleware para analizar cookies.
- [Express-session](https://www.npmjs.com/package/express-session): Middleware para la gestión de sesiones.
- [Http-errors](https://www.npmjs.com/package/http-errors): Biblioteca para crear errores HTTP.
- [Jade](https://www.npmjs.com/package/jade): Motor de plantillas para Node.js.
- [Method-override](https://www.npmjs.com/package/method-override): Middleware para sobrescribir métodos HTTP.
- [Mongo](https://www.npmjs.com/package/mongo): Cliente de MongoDB.
- [Mongodb](https://www.npmjs.com/package/mongodb): Driver oficial de MongoDB para Node.js.
- [Mongoose](https://www.npmjs.com/package/mongoose): ORM para MongoDB y Node.js.
- [Multer](https://www.npmjs.com/package/multer): Middleware para la gestión de archivos multipart/form-data.
- [Nodemon](https://www.npmjs.com/package/nodemon) **(opcional)**: Herramienta que reinicia automáticamente la aplicación Node.js cuando se detectan cambios en el código.
- [Passport](https://www.npmjs.com/package/passport): Middleware de autenticación para Node.js.
- [Passport-facebook](https://www.npmjs.com/package/passport-facebook): Estrategia de autenticación de Passport para Facebook.
- [Passport-google-oauth20](https://www.npmjs.com/package/passport-google-oauth20): Estrategia de autenticación de Passport para Google OAuth 2.0. 


## Instrucciones de Instalación y Ejecución

1. Clona este repositorio: `git clone https://github.com/tu-usuario/taller-web.git`
2. Entra al directorio del proyecto: `cd taller-web`
3. Instala las dependencias: `npm install`
4. Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:
``` 
SESSION_SECRET = tu_secreto_de_sesion
MONGODB_URI = tu_uri_de_mongodb_atlas
GOOGLE_CLIENT_ID = tu_google_client_id
GOOGLE_CLIENT_SECRET = tu_google_client_secret
FACEBOOK_APP_ID = tu_facebook_app_id
FACEBOOK_APP_SECRET = tu_facebook_app_secret
GOOGLE_MAPS_API_KEY = tu_google_maps_api_key
```
5. Inicia la aplicación con el comando: `npm start`
6. Abre tu navegador y navega a `http://localhost:3000`

## Estructura del proyecto

- `/bin`: Contiene los archivos ejecutables necesarios para el funcionamiento de la aplicación. 
- `/controllers`: Controladores que manejan la lógica de negocio para diferentes partes de la aplicación. 
- `/models`: Define los modelos de datos utilizados por la aplicación. 
- `/routes`: Contiene las rutas de la aplicación, que gestionan las solicitudes HTTP y dirigen el tráfico a los controladores correspondientes. 
- `/views`: Almacena las plantillas Jade para las diferentes vistas de la aplicación.
- `app.js`: Archivo principal de la aplicación que configura y arranca el servidor. 
- `passport-config.js`: Configuración de Passport.js para la autenticación de usuarios. 
- `package.json`: Archivo que define las dependencias del proyecto y los scripts de NPM.

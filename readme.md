1. Iniciar proyecto con npm init -y
2. Instalar dependencias express sequelize pg pg-store cors dotenv
3. Instalar dependencias de desarrollo nodemon morgan
4. Estructura de carpetas
   /src
   --/services
   --/models
   --/controllers
   --/routes
   --/middlewares
   --/seeders
   --/tests
   --/utils
   --/templates
   app.js
   server.js

////////Nota/////////
En 📄app.js --> Vamos a tener todo lo relacionado con express, middlewares, enrutamiento

5. Scripts

   "start": "node ./src/server.js",
   "dev": "nodemon ./src/server.js",

6. Crear un servidor básico
7. Configurar la conexión a la DB
   7. 1. Para esto necesito configurar variables de entorno, creo archivo .env en la raíz del proyecto
8. Autenticar la DB en app.js importando la instancia creada de sequelize
9. Crear un modelo genérico de usuario
    necesitamos l db y Datatypes para ello
10. Sincronizar base de datos
11. Proceso para registrar usuarios --> Crear usuarios
    --> Encriptar la contraseña
    --> Con el paquete bcrypt
   11. 1. Autenticación con el login
      --> Creamos la 📄ruta auth.routes.js
      --> Creamos el controlador 📄auth.controller.js
      --> Creamos el servicio 📄auth.services.js
         --> Creamos la clase AuthServices y el método statico y asíncrono register

12. Registrar usuarios
12. 1. Encriptar contraseña
      --> Descargamos la dependencia bycrypt --> npm i bcrypt
      --> En modelo añadimos el hook de beforeCreate y allí hacemos uso de bcrypt
      -->Generar token de autenticación con JWT
13. Nodemailer
   --> instalar --> npm install nodemailer
   --> crear archivo 📄mailer.js en utils y configurar
   --> Probar conexión en app
   --> enviar correo de prueba


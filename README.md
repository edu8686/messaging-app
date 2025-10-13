# 🗨️ Messaging App

Aplicación de mensajería en tiempo real que permite a los usuarios registrarse, iniciar sesión, enviar mensajes privados y en grupos, y gestionar su perfil. Construida con tecnologías modernas de frontend y backend.

---

## 📂 Estructura del proyecto

- **Backend/** → Código del servidor, APIs y lógica de negocio.
- **Frontend/** → Código de la aplicación React (interfaz de usuario).

---

## 🚀 Tecnologías

### Backend
- Node.js
- Express
- MongoDB
- JWT para autenticación

### Frontend
- React
- React Router
- Context API para manejo de estado
- CSS / Tailwind (según tu elección)
- WebSockets (Socket.IO) para mensajería en tiempo real

---

## ⚙️ Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/edu8686/messaging-app.git
cd messaging-app
````

### 2️⃣ Configurar Backend

````
cd Backend
npm install
````

- Crear archivo .env con variables necesarias:

```
DATABASE_URL=<tu_uri_postgres>
JWT_SECRET=<tu_clave_secreta>
```

- Iniciar el servidor

```
node app.js 
```

3️⃣ Configurar Frontend

``` 
cd ../Frontend
npm install
npm start
``` 

📱 Uso

- Abrir la aplicación en el navegador (http://localhost:3000).

- Registrarse o iniciar sesión.

- Navegar entre las secciones:

- Home → Resumen y mensajes recientes.

- Chats → Conversaciones privadas y grupales.

- Profile → Ver y editar perfil de usuario.

- New / New Group → Crear mensajes o grupos nuevos.

- Las rutas protegidas solo son accesibles si el usuario ha iniciado sesión correctamente.

🔒 Autenticación

- Se usa JWT y localStorage para mantener la sesión activa.

- Las rutas protegidas (/home, /chats, /profile) redirigen al login si el usuario no está autenticado.

- Las rutas públicas (/login, /signup) redirigen a /home si el usuario ya está logueado.

- Para configurar, cada desarrollador debe crear un archivo .env con sus credenciales y claves secretas (no se deben subir credenciales reales al repositorio).

🧪 Contribuciones

¡Contribuciones bienvenidas!

1. Hacer fork del repositorio.

2. Crear una nueva rama para tu feature o fix:
``` 
git checkout -b feature/nueva-caracteristica
``` 

3. Realizar cambios y hacer commit:
```
git commit -m "Agrega nueva funcionalidad"
``` 


4. Hacer push a tu fork y enviar pull request.

> Asegúrate de no incluir tus credenciales en commits ni en archivos .env.

📄 Licencia

Este proyecto está bajo la Licencia MIT.

Puedes usar, copiar, modificar y distribuir el proyecto, siempre respetando los términos de la licencia.


🙌 Créditos

Inspirado en apps de mensajería modernas.

Librerías y frameworks utilizados:

1. React, React Router, Context API

2. Node.js, Express, Prisma


Gracias a todos los tutoriales y recursos de la comunidad que ayudaron en el desarrollo de este proyecto, especialmente a The Odin Projects.
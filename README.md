# API de Reseñas de Películas

## Descripción

Esta API permite a los usuarios:
- Registrar usuarios.
- Crear reseñas asociadas a películas y usuarios.
- Consultar reseñas de películas con información del usuario que las creó.

Está desarrollada con **Node.js**, **Express**, **MongoDB**, y utiliza **Mongoose** como ORM.

---

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   Crear un archivo `.env` en la raíz del proyecto con los siguientes valores:
   ```env
   MONGO_URI=<URL_DE_TU_BASE_DE_DATOS_MONGODB>
   TMDB_API_KEY=<TU_CLAVE_DE_API_DE_TMDB>
   PORT=5000
   ```

4. Iniciar el servidor:
   ```bash
   npm run dev
   ```

El servidor estará corriendo en `http://localhost:5000`.

---

## Modelos

### Usuario (`User`)

| Campo       | Tipo     | Descripción                       |
|-------------|----------|-----------------------------------|
| `name`      | `String` | Nombre del usuario               |
| `email`     | `String` | Email único del usuario          |
| `createdAt` | `Date`   | Fecha de creación (por defecto)  |

### Reseña (`Review`)

| Campo       | Tipo                 | Descripción                                   |
|-------------|----------------------|-----------------------------------------------|
| `movieId`   | `String`             | ID de la película                            |
| `movieName` | `String`             | Nombre de la película                        |
| `content`   | `String`             | Contenido de la reseña                       |
| `user`      | `ObjectId (User)`    | Referencia al usuario que creó la reseña     |
| `createdAt` | `Date`               | Fecha de creación (por defecto)             |

---

## Rutas de la API

### **Usuarios**

#### **Registrar un Usuario**
- **Endpoint:** `POST /users/register`
- **Descripción:** Registra un nuevo usuario.
- **Cuerpo de la Solicitud:**
  ```json
  {
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
  ```
- **Respuesta Exitosa (201):**
  ```json
  {
    "_id": "64d97f2ad4523e7b9a1f4e21",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "createdAt": "2024-12-19T10:00:00.000Z"
  }
  ```

#### **Obtener Todos los Usuarios**
- **Endpoint:** `GET /users`
- **Descripción:** Devuelve la lista de usuarios registrados.
- **Respuesta Exitosa (200):**
  ```json
  [
    {
      "_id": "64d97f2ad4523e7b9a1f4e21",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "createdAt": "2024-12-19T10:00:00.000Z"
    }
  ]
  ```

---

### **Reseñas**

#### **Crear una Reseña**
- **Endpoint:** `POST /reviews`
- **Descripción:** Crea una nueva reseña asociada a un usuario y una película.
- **Cuerpo de la Solicitud:**
  ```json
  {
    "movieId": "550",
    "movieName": "Fight Club",
    "content": "¡Gran película!",
    "userId": "64d97f2ad4523e7b9a1f4e21"
  }
  ```
- **Respuesta Exitosa (201):**
  ```json
  {
    "_id": "64d98ab8e57d9e5b6c58b47e",
    "movieId": "550",
    "movieName": "Fight Club",
    "content": "¡Gran película!",
    "user": "64d97f2ad4523e7b9a1f4e21",
    "createdAt": "2024-12-19T10:00:00.000Z"
  }
  ```

#### **Obtener Reseñas por Película**
- **Endpoint:** `GET /reviews/:movieId`
- **Descripción:** Devuelve todas las reseñas de una película con información del usuario que las creó.
- **Respuesta Exitosa (200):**
  ```json
  [
    {
      "_id": "64d98ab8e57d9e5b6c58b47e",
      "movieId": "550",
      "movieName": "Fight Club",
      "content": "¡Gran película!",
      "user": {
        "_id": "64d97f2ad4523e7b9a1f4e21",
        "name": "Juan Pérez",
        "email": "juan@example.com"
      },
      "createdAt": "2024-12-19T10:00:00.000Z"
    }
  ]
  ```

---

### **API de TMDb**

#### **Buscar Películas**
- **Endpoint:** `GET /movies/search`
- **Descripción:** Busca películas en la API de TMDb usando un término de búsqueda.
- **Parámetros de Consulta:**
  - `query` (obligatorio): El término de búsqueda.
- **Ejemplo:** `GET /movies/search?query=matrix`
- **Respuesta Exitosa (200):**
  ```json
  [
    {
      "id": 603,
      "title": "The Matrix",
      "overview": "A computer hacker learns about the true nature of reality.",
      "release_date": "1999-03-30",
      "poster_path": "/path/to/poster.jpg"
    }
  ]
  ```

#### **Obtener Películas Populares**
- **Endpoint:** `GET /movies/popular`
- **Descripción:** Devuelve una lista de películas populares desde TMDb.
- **Respuesta Exitosa (200):**
  ```json
  [
    {
      "id": 12345,
      "title": "Popular Movie",
      "overview": "A popular movie description.",
      "release_date": "2024-01-01",
      "poster_path": "/path/to/poster.jpg"
    }
  ]
  ```

#### **Obtener Películas Mejor Calificadas**
- **Endpoint:** `GET /movies/topRated`
- **Descripción:** Devuelve una lista de películas mejor calificadas desde TMDb.
- **Respuesta Exitosa (200):**
  ```json
  [
    {
      "id": 12346,
      "title": "Top Rated Movie",
      "overview": "A top-rated movie description.",
      "release_date": "2023-12-15",
      "poster_path": "/path/to/poster.jpg"
    }
  ]
  ```

#### **Obtener Películas en Cartelera**
- **Endpoint:** `GET /movies/nowPlaying`
- **Descripción:** Devuelve una lista de películas que están actualmente en cartelera.
- **Respuesta Exitosa (200):**
  ```json
  [
    {
      "id": 12347,
      "title": "Now Playing Movie",
      "overview": "A now playing movie description.",
      "release_date": "2024-01-15",
      "poster_path": "/path/to/poster.jpg"
    }
  ]
  ```

#### **Obtener Próximas Películas**
- **Endpoint:** `GET /movies/upcoming`
- **Descripción:** Devuelve una lista de películas que se estrenarán próximamente.
- **Respuesta Exitosa (200):**
  ```json
  [
    {
      "id": 12348,
      "title": "Upcoming Movie",
      "overview": "An upcoming movie description.",
      "release_date": "2024-02-01",
      "poster_path": "/path/to/poster.jpg"
    }
  ]
  ```

---

## Dependencias

- **Node.js**: Framework principal.
- **Express**: Servidor web.
- **Mongoose**: ODM para MongoDB.
- **dotenv**: Gestión de variables de entorno.
- **axios**: Cliente HTTP para consumir la API de TMDb.
- **cors**: Habilitar solicitudes desde el frontend.

---

## Notas

1. Asegúrate de configurar correctamente la conexión a MongoDB en el archivo `.env`.
2. Puedes probar los endpoints con herramientas como **Postman** o **cURL**.
3. La clave de la API de TMDb debe ser válida para consumir los datos correctamente.

---

## Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).

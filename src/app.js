
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./cofig/db'); // Conexión a MongoDB

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
//Ruta de bienvenidad
app.get('/', (req, res) => {
    res.send('¡Bienvenido al backend de ElPalomitero!');
  });
// Rutas
app.use('/movies', require('./routes/moviesRoutes'));
app.use('/reviews', require('./routes/reviewsRoutes'));
app.use('/users',require('./routes/userRoutes'))
module.exports = app;

const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validar datos de entrada
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    // Crear el nuevo usuario
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado con éxito.' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});



// Obtener todos los usuarios (opcional)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Correo o contraseña incorrectos.' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso.', user });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});




module.exports = router;

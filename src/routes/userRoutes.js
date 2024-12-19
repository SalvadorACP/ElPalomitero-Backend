const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { name, email } = req.body;

  try {
    // Validar si el correo ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Crear un nuevo usuario
    const user = new User({ name, email });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

module.exports = router;

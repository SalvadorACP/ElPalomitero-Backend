const express = require('express');
const axios = require('axios');
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Buscar películas
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: { api_key: TMDB_API_KEY, query },
    });
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Obtener las películas populares (Pantalla principal)
router.get('/popular', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: { api_key: TMDB_API_KEY },
    });
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener las películas mejor calificadas
router.get('/topRated', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/top_rated`, {
      params: { api_key: TMDB_API_KEY },
    });
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener las películas en cartelera
router.get('/nowPlaying', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/now_playing`, {
      params: { api_key: TMDB_API_KEY },
    });
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener las próximas películas
router.get('/upcoming', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/upcoming`, {
      params: { api_key: TMDB_API_KEY },
    });
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener detalles de una película
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: { api_key: TMDB_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

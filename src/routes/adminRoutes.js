// Ruta para obtener estadísticas
router.get("/statistics", async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalReviews = await Review.countDocuments();
      const newUsers = await User.countDocuments({
        createdAt: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) }, // Últimos 30 días
      });
      const newReviews = await Review.countDocuments({
        createdAt: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) },
      });
  
      res.json({ totalUsers, totalReviews, newUsers, newReviews });
    } catch (error) {
      console.error("Error al obtener estadísticas:", error);
      res.status(500).json({ error: "Error al obtener estadísticas" });
    }
  });
  
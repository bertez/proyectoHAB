const Joi = require('joi')
const { database } = require('../infrastructure')

async function getExperiences(req, res) {
  try {
    const [experiences] = await database.pool.query('SELECT * FROM experiences');
    res.send(experiences);
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
};


async function getScore(req, res) {
  try {
    const { restaurantId } = req.params;

    const query = 'SELECT name FROM restaurants WHERE id = ?';
    const [restaurants] = await database.pool.query(query, restaurantId);

    if (!restaurants || !restaurants.length) {
      const err = new Error('Restaurante no encontrado');
      err.code = 404;
      throw err;
    }

    const reviewsQuery = 'SELECT * FROM review WHERE restaurant_id = ?';
    const [reviews] = await database.pool.query(reviewsQuery, restaurantId);

    const avgRating = (reviews.reduce((sum, review) => sum + review.rating, 0)) / reviews.length;

    res.send({
      name: restaurants[0].name,
      rating: avgRating.toFixed(4),
    });

  } catch (err) {
    res.status(err.code || 500);
    res.send({ error: err.message });
  }
}






module.exports = {
  getExperiences,
  getScore
};
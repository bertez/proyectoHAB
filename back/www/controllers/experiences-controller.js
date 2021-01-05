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
    const { experienceId } = req.params;

    const query = 'SELECT name FROM experiences WHERE id = ?';
    const [experiences] = await database.pool.query(query, [experienceId]);

    if (!experiences || experiences.length === 0) {
      const err = new Error('experiencia no encontrada');
      err.code = 404;
      throw err;
    }

    const reviewsQuery = 'SELECT * FROM review WHERE experience_id = ?';
    const [reviews] = await database.pool.query(reviewsQuery, experienceId);

    const avgRating = (reviews.reduce((sum, review) => sum + review.rating, 0)) / reviews.length;

    res.send({
      name: experiences[0].name,
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
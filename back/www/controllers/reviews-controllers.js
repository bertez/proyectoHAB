

const { database } = require('../infrastructure');
const Joi =require('joi');

async function createReview(req, res) {
  try {
    const {experienceId} = req.params;
    const { id } = req.auth;
    const { rating, text } = req.body;

    const schema = Joi.object({
      rating: Joi.number().min(1).max(5).required(),
      text: Joi.string(),
    });
    await schema.validateAsync({ rating, text });
    
    const selectQuery = 'SELECT * FROM experiences WHERE id = ?';
    const [experiences] = await database.pool.query(selectQuery, [experienceId]);
    console.log(experiences);
    if (!experiences || experiences.length === 0) {
      const err = new Error('la experiencia no existe');
      err.code = 404;
      throw err;
    }
    
    const insertQuery = 'INSERT INTO review (user_id, experience_id, rating, text) VALUES (?, ?, ?, ?)';
    
    const [result] = await database.pool.query(insertQuery, [id, experienceId, rating, text]);
    

    const createId = result.insertId;

    const query = 'SELECT * FROM review WHERE id = ?';
    const [reviews] = await database.pool.query(query, [createId]);

    res.status(201);
    res.send(reviews[0]);

  } catch (err) {
    res.status(res.code || 500);
    res.send({ error: err.message });
  }
}


async function getReviewsByUserId(req, res) {
  try {
    const { userId } = req.params;
    if (Number(userId) !== req.auth.id) {
      const err = new Error('El usuario no tiene permisos');
      err.code = 403;
      throw err;
    }

    const query = 'SELECT * FROM review WHERE user_id = ?';
    const [reviews] = await database.pool.query(query,[userId] );
    res.send(reviews);

  } catch (err) {
    res.status(err.code || 500);
    res.send({ error: err.message });
  }
}


async function updateReview(req, res) {
  try {
    const { reviewId } = req.params;
    const { rating, text } = req.body;

    const schema = Joi.object({
      rating: Joi.number().integer().min(1).max(5).required(),
      text: Joi.string(),
    });

    await schema.validateAsync({ rating, text });

    const query = 'SELECT * FROM review WHERE id = ?';
    const [reviews] = await database.pool.query(query, reviewId);

    if (!reviews || !reviews.length) {
      const err = new Error('La review no existe');
      err.code = 404;
      throw err;
    }

    const review = reviews[0];

    if (review.user_id !== req.auth.id) {
      const err = new Error('El usuario no tiene permisos');
      err.code = 403;
      throw err;
    }

    // modificamos la review  en la base de datos
    const updateQuery = 'UPDATE review SET rating = ?, text = ? WHERE id = ?';
    await database.pool.query(updateQuery, [rating, text, reviewId]);

    // devolvemos la review  modificado al cliente.
    const selectQuery = 'SELECT * FROM review WHERE id = ?';
    const [selectRows] = await database.pool.query(selectQuery, reviewId);

    res.send(selectRows[0]);

  } catch (err) {
    res.status(err.code || 500);
    res.send({ error: err.message });
  }
}
async function deleteReview(req, res) {
  try {
      const { id } = req.body;

      const deleteReview = await database.pool.query('DELETE FROM review WHERE id = ?', id);
      res.send(deleteReview [0]);
  }
  catch (error) {
      res.status(500);
      res.send({ error: error.message })
  }
}


module.exports = {
  createReview,
  getReviewsByUserId,
  updateReview,
  deleteReview
};
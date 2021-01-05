const Joi = require('joi');

const { database } = require('../infrastructure');

/**
 * Función que crea una review para el usuario que viene en
 * el token JWT. Es decir, el user_id que guardaremos en 
 * la base de datos para la review creada, será el id que venga
 * en req.auth.id
 */
async function createReview(req, res) {
  // recuperar id del experiencia => req.params.experienceId
  // recuperar id del usuario => req.auth.id
  // recuperar datos de la review => req.body
  // { rating: Number, text: String }

  // 1. validar datos del body
  // 2. comprobar que existe el experiencia
  // 3. insertar la review en bbdd
  // 4. devolver la review insertada en la response

  // const userId = req.auth.id;
  // const { id } = req.auth;
  // req.params.experienceId

  try {
    const { experienceId } = req.params;
   
    const { id } = req.auth;
    const { rating, text } = req.body;
    
    const schema = Joi.object({
      rating: Joi.number().min(1).max(5).required(),
      text: Joi.string().min(1).max(500),
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
    

    const { insertId } = result;

    const query = 'SELECT * FROM review WHERE id = ?';
    const [reviews] = await database.pool.query(query, [insertId]);

    res.status(201);
    res.send(reviews[0]);

  } catch (err) {
    res.status(res.code || 500);
    res.send({ error: err.message });
  }
}

/**
 * Función que busca las reviews que corresponden al usuario
 * que se pasa como parámetro en una request param, es decir,
 * el id del usuario estará en req.params.userId
 * 
 * Deberá comprobar que el id del usuario del cual se piden
 * las reviews es igual al id del usuario que viene en el 
 * token JWT. Es decir, el valor de req.auth.id
 * 
 * Si no coinciden, devolverá 401 Unauthorized 
 */
async function getReviewsByUserId(req, res) {
  // recuperar los datos de la request
  // 1. comprobar que el req.params.userId coincide con el req.auth.id
  // 2. enviar las reviews al cliente

  // Number(req.params.userId) === req.auth.id
  // parseInt(req.params.userId) === req.auth.id

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

/**
 * Función que modifica una review. El id de la review vendrá
 * como request param, es decir, vendrá en req.params.reviewId
 * 
 * Habrá que comprobar que la review que se intenta modificar
 * pertenece al usuario que viene en el token JWT. Es decir, el
 * user_id de la review en base de datos coincide con req.auth.id
 */
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


module.exports = {
  createReview,
  getReviewsByUserId,
  updateReview,
};
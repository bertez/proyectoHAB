const Joi = require('joi');

const { database } = require('../infrastructure');



 
async function createComentary(req, res) {
  try {
    const { experienceId } = req.params;
    const { texto } = req.body;
    const { foto } = req.body;
    console.log(texto);
    const schema = Joi.object({
      experience: Joi.string().min(1).max(3000).required(),
      texto: Joi.string().min(1).max(3000).required(),
      foto: Joi.string().min(1).max(3000)
    });

    await schema.validateAsync({ texto,foto,experienceId });

    const query = 'SELECT * FROM experience WHERE id = ?';
    const [experience] = await database.pool.query(query, experienceId);

    if (!experience || !experience.length) {
      const err = new Error('no existe');
      err.code = 404;
      throw err;
    }

    const updateQuery = 'INSERT commentary,foto SET texto = ?,foto=? WHERE id = ?';
    await database.pool.query(updateQuery, [ texto,foto, experienceId]);

    
    const selectQuery = 'SELECT * FROM experience WHERE id = ?';
    const [selectRows] = await database.pool.query(selectQuery, experienceId);

    res.send(selectRows[0]);

  } catch (err) {
    res.status(err.code || 500);
    res.send({ error: err.message });
  }
}


module.exports = {
  createComentary,
};
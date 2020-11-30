const { database } = require('../infrastructure')

async function getExperiences(req, res) {
  try {
    const [experiences] = await database.pool.query('SELECT * FROM experience');
    res.send(experiences);
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
};


async function getExperiencesByUserId(req, res) {


  try {
    const { userId } = req.params;

    if (Number(userId) !== req.auth.id) {
      const err = new Error('El usuario no tiene permisos');
      err.code = 403;
      throw err;
    }

    const query = 'SELECT * FROM experience WHERE id_user = ?';
    const [experience] = await database.pool.query(query, userId);
    res.send(experience);

  } catch (err) {
    res.status(err.code || 500);
    res.send({ error: err.message });
  }
}


async function createExperience(req, res) {


  try {
    const { experience } = req.params;
    const { userId } = req.auth;
    const { nombre, tipo, descripcion } = req.body;

    const schema = Joi.object({
      nombre: Joi.string().min(1).max(5).required(),
      tipo: Joi.string().min(1).max(5).required(),
      descripcion: Joi.string().min(1).max(5).required(),
    });

    await schema.validateAsync({ nombre,tipo,descripcion });

    const selectQuery = 'SELECT * FROM experience WHERE id = ?';
    const [experience] = await database.pool.query(selectQuery, experience);

    if (experience || experience.length) {
      const err = new Error('La experiencia ya existe');
      err.code = 404;
      throw err;
    }

    const insertQuery = 'INSERT INTO experience (user_id, nombre,tipo,descripcion) VALUES (?, ?, ?,?,?)';
    const [result] = await database.pool.query(insertQuery, [userId, nombre, tipo, descripcion]);

    const { insertId } = result;

    const query = 'SELECT * FROM experience WHERE id = ?';
    const [experience] = await database.pool.query(query, insertId);

    res.status(201);
    res.send(experience[0]);

  } catch (err) {
    res.status(res.code || 500);
    res.send({ error: err.message });
  }
}






module.exports = {
  getExperiences,
  getExperiencesByUserId,
  createExperience
};
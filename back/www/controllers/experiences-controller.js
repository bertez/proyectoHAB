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


async function getExperiencesById(req, res) {
  try {
    const [experiences] = await database.pool.query('SELECT id FROM experiences ');
    res.send(experiences);
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
};

  


async function createExperience(req, res) {


  try {
    const{ nombre, tipo, descripcion}=req.body;

    const schema = Joi.object({
      nombre: Joi.string().required(),
      tipo: Joi.string(),
      descripcion: Joi.string(),
    });

    await schema.validateAsync({ nombre,tipo,descripcion });

    const selectQuery = 'SELECT * FROM experience WHERE nombre = ?';
    const [experiences] = await database.pool.query(selectQuery, nombre);

    if (experiences || experiences.length) {
      const err = new Error('La experiencia ya existe');
      err.code = 409;
      throw err;
    }

    const insertQuery = 'INSERT INTO experiences ( nombre,tipo,descripcion) VALUES (?,?,?)';
    const [experiences] = await database.pool.query(insertQuery, [ nombre, tipo, descripcion]);

    res.status(201);
    res.send(experience[0]);

  } catch (err) {
    res.status(res.code || 500);
    res.send({ error: err.message });
  }
}






module.exports = {
  getExperiences,
  getExperiencesById,
  createExperience
};
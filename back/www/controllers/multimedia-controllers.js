const Joi = require('joi');

const { database } = require('../infrastructure');


async function getFotoByUserId(req, res) {
   
  
    try {
      const { userId } = req.params;
      
      if (Number(userId) !== req.auth.id) {
        const err = new Error('El usuario no tiene permisos');
        err.code = 403;
        throw err;
      }
  
      const query = 'SELECT * FROM multimedia WHERE user_id = ?';
      const [fotos] = await database.pool.query(query, userId);
      res.send(fotos);
  
    } catch (err) {
      res.status(err.code || 500);
      res.send({ error: err.message });
    }
  }
  
  

  async function createfoto(req, res) {
    try {
      const { multimedia } = req.params;
      const { foto } = req.body;
  
      const schema = Joi.object({
        foto: Joi.string().integer().min(1).max(50).required(),
       
      });
  
      await schema.validateAsync({ foto });
  
  
      const multimedia = multimedia[0];
  
      if (multimedia.user_id !== req.auth.id) {
        const err = new Error('El usuario no tiene permisos');
        err.code = 403;
        throw err;
      }
  
      
      const updateQuery = 'INSERT into multimedia SET  foto = ? id_experience = ?';
      await database.pool.query(updateQuery, [foto,id_experience]);
  
      
      const selectQuery = 'SELECT * FROM multimedia WHERE id = ?';
      const [selectRows] = await database.pool.query(selectQuery, foto);
  
      res.send(selectRows[0]);
  
    } catch (err) {
      res.status(err.code || 500);
      res.send({ error: err.message });
    }
  }
  
  
  module.exports = {
    getFotoByUserId,
    createfoto,
  };
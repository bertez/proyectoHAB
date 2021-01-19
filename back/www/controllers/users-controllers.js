const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { database } = require('../infrastructure');

async function getUsers(req, res) {
  try {
    const [users] = await database.pool.query('SELECT name FROM users');
    res.send(users);
    
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
}

async function getByUserId(req, res) {
	try {
	  const { Id } = req.params;
	  const query = 'SELECT * FROM users WHERE id = ?';
	  const [user] = await database.pool.query(query,[Id] );
	  res.send(user);
  
	} catch (err) {
	  res.status(err.code || 500);
	  res.send({ error: err.message });
	}
  }



async function login(req, res) {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
    });

    await schema.validateAsync({ email, password });

    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await database.pool.query(query, email);

    if (!rows || !rows.length) {
      const error = new Error('No existe el usuario');
      error.code = 404;
      throw error;
    }

    const user = rows[0];

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const error = new Error('El password no es válido');
      error.code = 401;
      throw error;
    }

  
    const tokenPayload = { id: user.id,  };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );
    
    res.send({ token, name: user.name });

  } catch (err) {
    res.status(err.code || 500);
    res.send({ error: err.message });
  }
}

async function register(req, res) {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const registerSchema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
    });

    await registerSchema.validateAsync(req.body);

   

    const query = 'SELECT * FROM users WHERE email = ?';
    const [users] = await database.pool.query(query, email);

    if (users.length) {
      const err = new Error('Ya existe un usuario con ese email');
      err.code = 409;
      throw err;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const ret = await database.pool.query(insertQuery, [name, email, passwordHash]);
    const id = ret[0].insertId;

    const tokenPayload = { id: id };
    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );
    
    res.send({ token, name });

  } catch (err) {
    res.status(err.code || 500);
    res.send({ error: err.message })
  }
}

module.exports = {
  
  getUsers,
  getByUserId,
  login,
  register
};
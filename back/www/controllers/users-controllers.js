const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { database } = require('../infrastructure');

async function getUsers(req, res) {
  try {
    const [users] = await database.pool.query('SELECT * FROM users');
    res.send(users);
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
}

async function createUser(req, res) {
  try {

    const { name, email, password } = req.body;

    const userSchema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
    });

    await userSchema.validateAsync({ name, email, password });

    const query = 'SELECT * FROM users WHERE email = ?';
    const [users] = await database.pool.query(query, email);

    if (users.length) {
      const err = new Error('Ya existe un usuario con ese email');
      err.code = 409;
      throw err;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const [rows] = await database.pool.query(insertQuery, [name, email, passwordHash]);

    const createdId = rows.insertId;

    const selectQuery = 'SELECT * FROM users WHERE id = ?';
    const [selectRows] = await database.pool.query(selectQuery, createdId);

    res.send(selectRows[0]);

  } catch (err) {
    res.status(err.code || 500);
    res.send({ error: err.message })
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

  
    const tokenPayload = { id: user.id, role: user.role };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );
    
    res.send({ token });

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
      repeatedPassword,
    } = req.body;

    const registerSchema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
      repeatedPassword: Joi.string().min(6).max(20).required(),
    });

    await registerSchema.validateAsync(req.body);

    if (password !== repeatedPassword) {
      const err = new Error('Los password no coinciden');
      err.code = 400;
      throw err;
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    const [users] = await database.pool.query(query, email);

    if (users.length) {
      const err = new Error('Ya existe un usuario con ese email');
      err.code = 409;
      throw err;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    await database.pool.query(insertQuery, [name, email, passwordHash]);

    res.status(201);
    res.send();

  } catch (err) {
    res.status(err.code || 500);
    res.send({ error: err.message })
  }
}

module.exports = {
  createUser,
  getUsers,
  login,
  register
};
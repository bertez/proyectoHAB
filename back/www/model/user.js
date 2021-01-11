const { database } = require("../infrastructure");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



async function getAll() {
    const [users] = await database.pool.query('SELECT name FROM users')
    return users
}

async function getUserById(id) {
  const [users] = await database.pool.query('SELECT * FROM users WHERE id='+id)

  if ( users.length > 0 ) {
    return users[0]
  }
  else {
    throw new Error( 'User not found' )
  }
}

async function Login(user) {
   
    const email = user.email;
    const password = user.password;

    const query = 'SELECT * FROM users WHERE email = '+email;
    const [rows] = await database.pool.query(query, [email]);

    if (!rows || !rows.length) {
      const error = new Error('No existe el usuario');
      error.code = 404;
      throw error;
    }

    const users = rows[0];

    

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const error = new Error('El password no es válido');
      error.code = 401;
      throw error;
    }

  
    const tokenPayload = { id: users.id, role: users.role };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );
    
    res.send({ token });
}

module.exports = {
    getAll,
    getUserById,
    Login
}
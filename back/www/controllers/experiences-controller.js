const { database } = require('../infrastructure');

const fs = require('fs').promises;
const path = require('path');

async function getExperiences(req, res) {
	try {
		const query = 'SELECT * FROM experiences';
		const [experiences] = await database.pool.query(query);
		res.send(experiences);
	} catch (err) {
		res.status(500);
		res.send({ error: err.message });
	}
};

async function getExperience(req, res) {
	try {
		const { id } = req.params;

		const query = 'SELECT * FROM experiences where id = ?';
		const [experiences] = await database.pool.query(query, [id]);
		res.send(experiences[0]);
	} catch (err) {
		res.status(500);
		res.send({ error: err.message });
	}
};

async function getExperiencesUserId(req, res) {
	try {
		const  {id } = req.auth;
		console.log('Id de auth', id);
	  const query = 'SELECT * FROM experiences WHERE user_id = ?';
	  const [experiences] = await database.pool.query(query,[id] );
	  res.status(201)
	  res.send(experiences);
	  console.log(experiences);
	} catch (err) {
	  res.status(err.code || 500);
	  res.send({ error: err.message });
	}
  }

  async function getExperiencesByLocation(req, res) {
	try {
	  const { localizacion} = req.params;
	  const query = 'SELECT * FROM experiences WHERE localizacion = ?';
	  const [experiences] = await database.pool.query(query,[localizacion] );
	  res.send(experiences);
	  
  
	} catch (err) {
	  res.status(err.code || 500);
	  res.send({ error: err.message });
	}
  }
  async function getExperiencesByTipo(req, res) {
	try {
	  const { tipo} = req.params;
	  const query = 'SELECT * FROM experiences WHERE tipo = ?';
	  const [experiences] = await database.pool.query(query,[tipo] );
	  res.send(experiences);
	  console.log(experiences);
  
	} catch (err) {
	  res.status(err.code || 500);
	  res.send({ error: err.message });
	}
  }
  


async function createExperience(req, res) {

	try {
		const { nombre, tipo, descripcion , localizacion} = req.body;
		
		const { id } = req.auth;
		const insertQuery = 'INSERT INTO experiences ( user_id, nombre, tipo, descripcion, localizacion) VALUES ( ?,?, ?, ?, ?)';

		const [result] = await database.pool.query(insertQuery, [id, nombre, tipo, descripcion, localizacion]);

		const  createId = result.insertId
		let imageName;
		if (req.file) { 
			imageName = "experience-image-" + createId;
			await fs.writeFile(path.join('uploads', imageName) , req.file.buffer)
			imageName = ('http://localhost:3000/static/'+imageName)
		}
		if(imageName){
			await database.pool.query('UPDATE experiences SET imagen = ? WHERE id = ?',[imageName,createId])
		}

		const query = await database.pool.query('SELECT * FROM experiences WHERE id = ?',createId) ;
		

		res.status(201);
		res.send(query[0][0]);

	} catch (err) {
		res.status(res.code || 500);
		res.send({ error: err.message });
	}
}



async function getScore(req, res) {
	try {
		const { experienceId } = req.params;

		const query = 'SELECT name FROM experiences WHERE id = ?';
		const [experiences] = await database.pool.query(query, [experienceId]);

	

		const reviewsQuery = 'SELECT * FROM review WHERE experience_id = ?';
		const [reviews] = await database.pool.query(reviewsQuery, [experienceId]);

		const avgRating = (reviews.reduce((sum, review) => sum + review.rating, 0)) / reviews.length;

		res.send({
			name: experiences[0].name,
			rating: avgRating.toFixed(5),
		});

	} catch (err) {
		res.status(err.code || 500);
		res.send({ error: err.message });
	}
}






module.exports = {
	getExperiences,
	getExperience,
	getExperiencesUserId,
	getExperiencesByLocation,
	getExperiencesByTipo,
	createExperience,
	getScore
};
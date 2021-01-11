const { database } = require('../infrastructure');

const fs = require('fs').promises;
const path = require('path');

async function getExperiences(req, res) {
	try {


		const query = 'SELECT * FROM experiences ';
		const [experiences] = await database.pool.query(query);
		res.send(experiences);
	} catch (err) {
		res.status(500);
		res.send({ error: err.message });
	}
};


async function createExperience(req, res) {


	try {
/* 
		const { id } = req.auth;

		const { nombre, tipo, descripcion } = req.body;



		const selectQuery = 'SELECT * FROM experiences';

		const [experiences] = await database.pool.query(selectQuery, id);
		console.log(experiences);
		if (!experiences || experiences.length === 0) {
			const err = new Error('la experiencia no existe');
			err.code = 404;
			throw err;
		} */
		const { nombre, tipo, descripcion } = req.body;
		const { id } = req.auth;
		const insertQuery = 'INSERT INTO experiences ( user_id, nombre, tipo, descripcion) VALUES ( ?,?, ?, ?)';

		const [result] = await database.pool.query(insertQuery, [id, nombre, tipo, descripcion]);


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
		res.send(query[0]);

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

		if (!experiences || experiences.length === 0) {
			const err = new Error('experiencia no encontrada');
			err.code = 404;
			throw err;
		}

		const reviewsQuery = 'SELECT * FROM review WHERE experience_id = ?';
		const [reviews] = await database.pool.query(reviewsQuery, [experienceId]);

		const avgRating = (reviews.reduce((sum, review) => sum + review.rating, 0)) / reviews.length;

		res.send({
			name: experiences[0].name,
			rating: avgRating.toFixed(4),
		});

	} catch (err) {
		res.status(err.code || 500);
		res.send({ error: err.message });
	}
}






module.exports = {
	getExperiences,
	createExperience,
	getScore
};
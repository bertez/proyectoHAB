const { database } = require('../infrastructure')

// Model definition
// const Experience = {
// 	user id,
// 	nombre,
// 	tipo,
// 	descripcion
// }

async function getAll() {
	const [experience] = await database.pool.query('SELECT * FROM experiences');
	return experience
}

async function getExperienceById(id) {
	const [experience] = await database.pool.query('SELECT * FROM experiences where id=?',id)
	return experience
}
async function createExperience(experience){
	const insertQuery = 'INSERT INTO experiences (user_id,  nombre, tipo, descripcion) VALUES (?, ?, ?, ?)';
	// const { nombre, tipo, descripcion } = experience
    
	const [result] = await database.pool.query(insertQuery, [experience.user_id, experience.nombre, experience.tipo, experience.descripcion]);
	return result
}


async function getAllByUser(id) {
	const [ experiences ] = await database.pool.query(`SELECT * FROM experiences where user_id=${id}`)
//	return database.pool.query('SELECT * FROM experiences where user_id='+id)
	return experiences
	//SELECT * FROM experiences where user_id=1
}



module.exports = {
	getAll,
	getExperienceById,
	createExperience,
	getAllByUser
}
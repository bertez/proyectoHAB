const { database } = require('../infrastructure')

function getAll() {
	return database.pool.query('SELECT * FROM experiences');
}

module.exports = {
	getAll
}
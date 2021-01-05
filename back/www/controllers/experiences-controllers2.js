const experiences = require('../model/experiencies')

function getExperiences() {
	return experiences.getAll()
}

module.exports = {
	getExperiences
}
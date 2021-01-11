const experiences = require('../model/experiencie')

function getExperiences() {
	return experiences.getAll()
}

function getExperienceById( id ) {
	return experiences.getExperienceById( id )
}

function createExperience( experience ) {
	return experiences.createExperience( experience) 
}

function getAllByUser(id) {
	return experiences.getAllByUser(id)
}
module.exports = {
	getExperiences,
	getExperienceById,
	createExperience,
	getAllByUser
}
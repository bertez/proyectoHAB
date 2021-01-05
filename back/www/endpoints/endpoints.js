const experiencesController = require( '../controllers/experiences-controllers2')

async function getExperiences( _req, res ) {

	try {
		const experiences = await experiencesController.getExperiences()
		res.send( experiences )
	}
	catch (err) {
		res.status(500);
		res.send({ error: err.message });
	}
}

module.exports = {
	getExperiences
}
const { database } = require("../infrastructure");


async function getReviewByUserId(id) {
	const [review] = await database.pool.query('SELECT * FROM review where id='+id)
	return experience
}

async function createReview(review) {
    const insertQuery = 'INSERT INTO review (user_id, experience_id, rating, text) VALUES ( ?,?,?, ?)';
	
    const [result] = await database.pool.query(insertQuery, [review.user_id, review.experience_id , review.rating, review.text]);
		return result
}

module.exports = {
    getReviewByUserId,
    createReview
}
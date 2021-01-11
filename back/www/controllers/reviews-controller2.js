const reviews = require('../model/review');

function  getReviewsByUserId(id) {
    return reviews.getReviewByUserId(id);

}

function createReview(review) {
    return reviews.createReview(review);
}

module.exports ={
    getReviewsByUserId,
    createReview
}
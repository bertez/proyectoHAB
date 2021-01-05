require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {
    experiencesController, 
    usersController, 
    reviewsControllers
} = require('./controllers');
const cors = require('cors');

const { validateAuthorization } = require('./middlewares');

const { HTTP_PORT } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());
//endpoints
//experiences
app.get('/api/experiences',experiencesController.getExperiences);

//users
app.get('/api/users', usersController.getUsers);
app.post('/api/users/login', usersController.login);
app.post('/api/users/register', usersController.register);


//reviews

app.get('/api/reviews/:userId', validateAuthorization, reviewsControllers.getReviewsByUserId);
app.post('/api/reviews/:restaurantId', validateAuthorization, reviewsControllers.createReview);
app.put('/api/reviews/:reviewId', validateAuthorization, reviewsControllers.updateReview);


app.listen(HTTP_PORT, ()=>console.log('escuchando'));
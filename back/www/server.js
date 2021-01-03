require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {
    experiencesController, 
    usersController, 
    reviewsControllers
} = require('./controllers')



const { HTTP_PORT } = process.env;

const app = express();
app.use(bodyParser.json());
//endpoints
//experiences
app.get('/api/experiences',experiencesController.getExperiences);
app.get('api/experience/:id', experiencesController.getExperiencesById);
app.post('api/experience', experiencesController.createExperience);
//users
app.get('/api/users', usersController.getUsers);
app.post('/api/users/login', usersController.login);
app.post('/api/users/register', usersController.register);


//Commentary

app.post('/api/reviews', reviewsControllers.createReview);

app.listen(HTTP_PORT, ()=>console.log('escuchando'));
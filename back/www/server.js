require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {experiencesController, usersController, commentaryControllers} = require('./controllers')



const { HTTP_PORT } = process.env;

const app = express();
app.use(bodyParser.json());
//endpoints
//experiences
app.get('/api/experiences',experiencesController.getExperiences);
app.get('api/experience/users', experiencesController.getExperiencesByUserId);
app.post('api/experience/create', experiencesController.createExperience);
//users
app.get('/api/users', usersController.getUsers);
app.post('/api/users', usersController.createUser);
app.post('/api/users/login', usersController.login);
app.post('/api/users/register', usersController.register);


//Commentary

app.post('/api/commentary', commentaryControllers.updateComentary);

app.listen(HTTP_PORT, ()=>console.log('escuchando'));
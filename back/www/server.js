require('dotenv').config();

const { validateAuthorization } = require('./middlewares');
const { HTTP_PORT } = process.env;

const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
	experiencesController, 
	usersController, 
	reviewsControllers
} = require('./controllers');

const endPoints = require('./endpoints/endpoints');



const app = express();
const upload = multer();

app.use('/static', express.static('uploads'))
app.use(cors());
app.use(bodyParser.json());

//endpoints
//users

//app.get('/api/users', endPoints.getUsers);
//app.get('/api/users/userbyid/:id', endPoints.getUserById);
//app.post('/api/users/login', endPoints.login);
app.get('/api/users', usersController.getUsers);
app.get('/api/users/id', validateAuthorization, usersController.getByUserId)
app.post('/api/users/login', usersController.login);
app.post('/api/users/register', usersController.register);

//experiences

//app.get('/api/experiences', endPoints.getExperiences );
//app.get('/api/experiences/experiencesId/:id',endPoints.getExperienceById);
//app.post('/api/experiences/create',endPoints.createExperience);
app.get('/api/experiences',experiencesController.getExperiences);
app.get('/api/experiences/:id', validateAuthorization, experiencesController.getExperience);
app.get('/api/experiences/score/:experienceId',experiencesController.getScore);
app.get('/api/experiencesbyuser',  validateAuthorization, experiencesController.getExperiencesUserId);
app.get('/api/experiences/bylocation/:localizacion',experiencesController.getExperiencesByLocation);
app.get('/api/experiences/bytipo/:tipo',experiencesController.getExperiencesByTipo);
app.post('/api/experiences/create', validateAuthorization, upload.single('imagen'),experiencesController.createExperience);


//reviews


//app.get('/api/reviews/:userId', validateAuthorization, endPoints.getReviewsByUserId)
//app.post('/api/reviews/create', endPoints.createReview);
app.get('/api/reviews/:userId', validateAuthorization, reviewsControllers.getReviewsByUserId);
app.post('/api/reviews/newReview/:experienceId', validateAuthorization, reviewsControllers.createReview);
app.put('/api/reviews/:reviewId', validateAuthorization, reviewsControllers.updateReview);
app.delete('/api/reviews/deleteReview', validateAuthorization, reviewsControllers.deleteReview)


app.listen(HTTP_PORT, ()=>console.log('escuchando'));
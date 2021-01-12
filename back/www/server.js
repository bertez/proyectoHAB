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
//experiences

//app.get('/api/experiences', endPoints.getExperiences );
//app.get('/api/experiences/experiencesId/:id',endPoints.getExperienceById);
//app.post('/api/experiences/create',endPoints.createExperience);
app.get('/api/experiences',experiencesController.getExperiences);
app.get('/api/experiences/:userId', validateAuthorization, experiencesController.getExperiencesByUserId);
app.post('/api/experiences/create', validateAuthorization, upload.single('imagen'),experiencesController.createExperience);

//users

//app.get('/api/users', endPoints.getUsers);
//app.get('/api/users/userbyid/:id', endPoints.getUserById);
//app.post('/api/users/login', endPoints.login);
app.get('/api/users', usersController.getUsers);
app.post('/api/users/login', usersController.login);
app.post('/api/users/register', usersController.register);



//app.get('/api/reviews/:userId', validateAuthorization, endPoints.getReviewsByUserId)
//app.post('/api/reviews/create', endPoints.createReview);
app.get('/api/reviews/:userId', validateAuthorization, reviewsControllers.getReviewsByUserId);
app.post('/api/reviews/:experienceId', validateAuthorization, reviewsControllers.createReview);
app.put('/api/reviews/:reviewId', validateAuthorization, reviewsControllers.updateReview);
app.delete('/api/articles/deteleReview', validateAuthorization, reviewsControllers.deleteReview)


app.listen(HTTP_PORT, ()=>console.log('escuchando'));
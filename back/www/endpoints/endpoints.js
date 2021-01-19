const usersController = require('../controllers/users-controller2');
const experiencesController = require('../controllers/experiences-controllers2');
const reviewsControllers = require('../controllers/reviews-controller2');

async function getExperiences(_req, res) {

    try {
        const experiences = await experiencesController.getExperiences();
        res.send(experiences)
    }
    catch (err) {
        res.status(500);
        res.send({ error: err.message });
    }
}

async function getExperienceById(req, res) {
    // https://localhost:3000/api/experiences/expeiencesId/{id}    esto usando en app.get('/api/experiences/experiencesId/:id')
    // https://localhost:3000/api/experiences/expeiencesId?id={id}  esto usando en app.get('/api/experiences/experiencesId?id={id}')
    try {
        const id = req.params['id']

        const getExperiencesById = await experiencesController.getExperienceById(id);
        res.send(getExperiencesById)
    }
    catch (err) {
        res.status(500);
        res.send({ error: err.message });
    }
}

async function createExperience(req, res) {
    // params:  ?user_id={id}+nombre=
    try {

        const experience = {
            user_id: req.body['user_id'],
            nombre: req.body['nombre'],
            tipo: req.body['tipo'],
            descripcion: req.body['descripcion'],
        }
        const createExperience = await experiencesController.createExperience(experience);
        res.send(createExperience)
    }
    catch (err) {
        res.status(500);
        res.send({ error: err.message });
    }
}

async function createReview(req, res) {
    // POST http://localhost/api/createReview?rating={rating}&text={text}&userId={user_id}.....
    /* POST http://localhost/api/createReview  => json = {
        "rating": {rating},
        "text": {text} .....
    }*/

    try {

        const review = {
            experience_id: req.body['experience_id'],
            user_id: req.body['user_id'],
            rating: req.body['rating'],
            text: req.body['text'],
        }
        const createReview = await reviewsControllers.createReview(review);
        res.send(createReview)

    }

    catch (err) {
        res.status(500);
        res.send({ error: err.message })
    }
}

async function getUsers(_req, res) {
    try {
        const users = await usersController.getUsers();
        res.send(users)
    }
    catch (err) {
        res.status(500);
        res.send({ error: err.message });
    }
}

async function getUserById(req, res) {
    // https://localhost:3000/api/usersId/{id}    esto usando en app.get('/api/experiences/experiencesId/:id')
    // https://localhost:3000/api/experiences/expeiencesId?id={id}  esto usando en app.get('/api/experiences/experiencesId?id={id}')
    try {
        const id = req.params['id']
        const user = await usersController.getUserById(id);

        res.send(user)

    }
    catch (err) {
        res.status(500);
        res.send({ error: err.message });
    }
}





async function login(req, res) {
    try {
        const { email, password } = req.body;
        const login = await usersController.login(email,password);
        res.send(login)
    }
    catch (err) {
        // console.log(res)
        res.status(500);
        res.send({ error: err.message });
    }
}

async function getReviewsByUserId(req,res) {
    try {
        const id = req.params['id']
        const getReviewsByUserId = await reviewsControllers.getReviewsByUserId(id);
        res.send(getReviewsByUserId)
    }
    catch (err) {
        res.status(500);
        res.send({ error: err.message });
    }
}


module.exports = {
    getExperiences,
    getExperienceById,
    getUsers,
    getUserById,
    createExperience,
    login,
    getReviewsByUserId,
    createReview
}
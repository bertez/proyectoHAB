
const users = require('../model/user')
const experiencesController = require('../controllers/experiences-controllers2')

function getUsers() {
    return users.getAll()
    
}

async function getUserById( id ) {
    const user = await users.getUserById( id )   // nos traemos de la BD el user con id == id
                                                // user es el usuario que buscabamos
                                                // ahora queremos las experiencias de este usuario
    // select * from users where id = id;
                                
    const experiencesUser = await experiencesController.getAllByUser( id ) // y aquí las recogemos
                                                // getAllByUser buscará en la BD todas las experiencias con 'user_id' igual a id
    // select * from experiences where user_id = id;
    
    // console.log( user, experiencesUser )

    user.password = undefined

    const alluser = {
        ...user,
        experiences: [ ...experiencesUser ]
    }

    // console.log( alluser.experiences[0].nombre )
    // console.log( alluser )

    return alluser
}


async function login(email,password) {
    const user = await users.Login(email,password)
    return user
}

module.exports = {
    getUsers,
    getUserById,
    login
}
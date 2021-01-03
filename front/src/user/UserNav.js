import Profile from './Profile'
import Experiencias from '../routes/Experiencias'
import CreateExperience from '../routes/CreateExperience'

function UserNav({tab,setTab}){
    const tabs = ['mi perfil', 'crear experiencia', 'experiencias']

    return(
        <div className="user-nav">
            <Profile/>
            <Experiencias/>
            <CreateExperience/>
        </div>

    );
}

export default UserNav
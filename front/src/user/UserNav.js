import Profile from './Profile'
import Experiencias from '../routes/Experiencias'
import CreateExperience from '../routes/CreateExperience'

function UserNav(){
    

    return(
        <div className="user-nav">
            
            <Experiencias/>
            <CreateExperience/>
        </div>

    );
}

export default UserNav
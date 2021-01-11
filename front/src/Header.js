import { useUser } from './user/UserContext';
import './Header.css'
import { Link } from 'react-router-dom';
import Acordeon from './Acordeon';
import Auth from './user/Auth';
import logo from './images/logo.png';
import CreateExperience from './routes/CreateExperience';

function Header() {
      

    
  const me = useUser()

  if(!me){
    return(
        <div className='App-header'>

         <img src={logo} className="App-logo" alt="logo" /> 
        <Acordeon>
            <Auth />
        </Acordeon>
    </div> 
     
    )
  }
  return (
    <header className="App-header">
      <div>
         <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
      </div>
      {me &&
        <div className ='userName'>
           <div>{me.name}</div> 
        </div>
      }
       <div>
         <Link to="./routes/CreateExperience">
         ➕
         </Link>
      </div>
      
      
    </header>
  )
}

export default Header

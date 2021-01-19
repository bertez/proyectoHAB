import { useUser } from './user/UserContext';
import './Header.css'
import { Link } from 'react-router-dom';
import logo from './images/logo.png';

function Header() {
      

    
  const me = useUser()

  if(!me){
    return(
        <div className='App-header'>

          <Link to="/"><img src={logo} className="App-logo" alt="logo" /> </Link>
          <Link to="/login"><button>LOGIN</button></Link>
    </div> 
     
    )
  }
  return (
    <header className="App-header">
      <div>
         <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
      </div>
      <div className ='userName'>
        <Link to="/experience/user/">
          <button>{me.name}</button>
          </Link>
      </div>
       <div className ='crear-experience'>
         <Link to="/experience/new">
         <button>CREAR</button>
         </Link>
      </div>
      <div className ='buscar'>
         <Link to="/location">
         <button>¿Donde?</button>
         </Link>
      </div>
      <div className ='buscarTipo'>
         <Link to="/tipo">
         <button>¿Tipo?</button>
         </Link>
      </div>
      
      
    </header>
  )
}

export default Header

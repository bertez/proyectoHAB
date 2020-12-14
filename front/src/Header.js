import './Header.css'
import logo from './images/logo.png';


function Header(){

    return(
        <div className='App-header'>
            
            <img src={logo} className="App-logo" alt="logo" />
           
        </div>
    )
}

export default Header
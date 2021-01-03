import './Header.css'
import logo from './images/logo.png';
import Acordeon from './Acordeon';
import Auth from './user/Auth';

function Header() {

    return (
        <div className='App-header'>

            <img src={logo} className="App-logo" alt="logo" />
            <Acordeon>
                <Auth />
            </Acordeon>
        </div>
    )
}

export default Header
import { Link } from 'react-router-dom';
import logo from './images/logo.png';
import './Footer.css'
function Footer() {
    return(
        <footer className="App-footer">
        <div>
           <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
        </div>
        <div className ='footerName'>
            <p>lorem </p>
        </div>
        
        
        
      </footer>
    )
    
}

export default Footer;
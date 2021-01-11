import { useUser } from './UserContext'
import './Header.css'
import { Link } from 'react-router-dom'
import UserNav from './UserNav'
import logo from '../images/logo.png'
function Header() {
  const me = useUser()

  if(!me){
    return(
      <div>
        <h2>hola</h2>
      </div>
    )
  }
  return (
    <header className="topbar">
      <div>
        <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
      </div>
      {me &&
        <div>
          <img src={me.avatar} />
          <span>
            {me.username}
          </span>
        </div>
      }
      <UserNav/>
    </header>
  )
}

export default Header
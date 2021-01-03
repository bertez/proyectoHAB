import { useUser } from './UserContext'
import './Header.css'
import { Link } from 'react-router-dom'
import UserNav from './UserNav'
function Header() {
  const me = useUser()

  return (
    <header className="topbar">
      <div>
        <Link to="/">Viajes diferentes</Link>
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
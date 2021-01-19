import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSetUser, useUser } from "./UserContext";
import './Register.css';
function Register() {
  const me = useUser()
  const setMe = useSetUser()

  const [user, setUser] = useState({})
  const [error, setError] = useState()

  const handleSubmit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          setMe(data)
        } else {
          setError(data.error || true)
        }
      })
      .catch(e => setError(true))
  }

  if (me) {
    return <Redirect to="/" />
  }

  return (
    
    <form className="formulario-register" onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="nombre..."
        value={user.name || ''}
        onChange={e => setUser({ ...user, name: e.target.value })}
      />
    <input
        name="email"
        type="email"
        placeholder="Email..."
        value={user.email || ''}
        onChange={e => setUser({ ...user, email: e.target.value })}
      />
      <input
        name="password"
        type="password"
        
        placeholder="Contraseña..."
        value={user.password || ''}
        onChange={e => setUser({ ...user, password: e.target.value })}
      />
      <button>Registro</button>
      
      
    </form>
    
  )
}

export default Register
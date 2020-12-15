import { useState } from "react"
import { useSetUser } from "./UserContext"

function Register() {
  const setMe = useSetUser()

  const [user, setUser] = useState({})
  const [error, setError] = useState()

  const handleSubmit = e => {
    e.preventDefault()
    fetch('http://localhost:8080/signup', {
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
  return (
    <form onSubmit={handleSubmit}>
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
        required
        placeholder="Contraseña..."
        value={user.password || ''}
        onChange={e => setUser({ ...user, password: e.target.value })}
      />
      <button>Registro</button>
      {error &&
        <div className="error">
          {error === true ? 'Error de registro' : error}
        </div>
      }
    </form>
  )
}

export default Register
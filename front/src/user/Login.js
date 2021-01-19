import { useState } from "react"
import{ Link, Redirect } from 'react-router-dom'
import { login } from '../Api'
import { useSetUser, useUser } from "./UserContext"
import './Login.css';
function Login() {
  const me = useUser()
  const setMe = useSetUser()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
 
  const [error, setError] = useState()

  const handleSubmit = async e => {
    e.preventDefault();

    const data = await login(email,password);
    
     
        if (data.token) {
          setMe(data)
        } else {
          setError(data.error || true)
        }
      }
      if(!setMe){
        return "loading"
      }
      

  if (me) {
    return <Redirect to="/" />
  }

  return (
    <div className="login">
    <form className="formulario-login" onSubmit={handleSubmit}>
      <input
         name="email"
         type="email"
         placeholder="Email..."
        
         onChange={e => setEmail(e.target.value )}
      />
      <input
        name="password"
        type="password"
        required
        placeholder="Contraseña..."
        
        onChange={e => setPassword(  e.target.value )}
      />
      <button className = "buttonLogin">Entrar</button>
      <p className="linkRegister">
        No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </form>
    </div>
  )
}

export default Login
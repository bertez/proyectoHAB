import { useState } from "react"
import { login } from '../Api'
import { useSetUser, useUser } from "./UserContext"

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
      
  

  return (
    <form onSubmit={handleSubmit}>
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
      <button>Entrar</button>
   
    </form>
  )
}

export default Login
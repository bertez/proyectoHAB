import { useState } from 'react'
import Login from './Login'
import Register from './Register'
import './Auth.css'

function Auth() {
  const [isRegister, setRegister] = useState(false)

  return (
    <div className={'page Auth ' + (isRegister ? 'register' : 'login')}>
      <main>
        <h1>
          {isRegister ? 'Registro' : 'Iniciar sesión'}
        </h1>
        {isRegister ? <Register /> : <Login />}
      </main>
      <aside>
        {isRegister &&
          <p>
            Ya dispones de una cuenta?
            <strong onClick={() => setRegister(false)}>Inicia sesión</strong>
          </p>
        }
        {!isRegister &&
          <p>
            No tienes una cuenta?
            <strong onClick={() => setRegister(true)}>Regístrate</strong>
          </p>
        }
      </aside>
    </div>
  )
}

export default Auth;
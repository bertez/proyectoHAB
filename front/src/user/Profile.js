import { useState } from 'react'
import { useSetUser, useUser } from "./UserContext";
import './Profile.css'

function Profile() {
  const { user: me, token } = useUser()
  const setMe = useSetUser()

  // Tomamos los datos del usuario actual como estado inicial
  const [displayName, setDisplayName] = useState(me.displayName || '')
  const [email, setEmail] = useState(me.email || '')
  const [city, setCity] = useState(me.city || '')

  const handleSubmit = e => {
    e.preventDefault()
    // Como avatar no usa state, tenemos que obtenerlo de otra forma:
    const avatar = e.target.avatar.files[0] // avatar es el "name" del input

    // Para enviar los datos, como la imagen es un file, usamos un FormData
    const fd = new FormData()
    fd.append('avatar', avatar)
    fd.append('displayName', displayName)
    fd.append('email', email)
    fd.append('city', city)

    // Luego hacemos un fetch normal, usando el FormData como body
    // En este caso no se pone el header content-type! Sólo el token...
    fetch('http://localhost:8080/users/me', {
      method: 'PUT',
      headers: { 'Authorization': 'Bearer ' + token },
      body: fd
    })
      .then(res => res.json())
      .then(data => {
        // Todo fue bien. En este caso, actualizamos los datos del context
        // para que se vean de inmediato en el header y demás lugares
        setMe({ token, user: data })
      })
  }

  // Ver Header para más info sobre la siguiente línea
  const avatarStyle = me && me.avatar && { backgroundImage: 'url(' + me.avatar + ')' }

  return (
    <div className="section profile">
      <h2>Mi perfil</h2>
      <p>Desde aquí puedes editar tu perfil de usuario, y subir una foto de perfil.</p>
      <form onSubmit={handleSubmit}>
        <label className="avatar-picker">
          <span>Foto de perfil:</span>
          <div className="value">
            <div className="avatar" style={avatarStyle} />
            <input name="avatar" type="file" accept="image/*" />
            {/* Ojo: Los input type file no usan value/onChange! */}
          </div>
        </label>
        <label>
          <span>Nombre completo:</span>
          <input
            name="full-name"
            value={displayName}
            onChange={e => setDisplayName(e.target.value )}
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Ciudad:</span>
          <input
            name="city"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </label>
        <button>Guardar</button>
      </form>
    </div>
  );
}

export default Profile;
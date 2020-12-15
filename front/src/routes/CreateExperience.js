import { useState } from 'react'
import { edit } from '../api'
import { useUser } from '../UserContext'
import './CreateExperience.css'

function CreateExperience({ experience }) {
  const [name, setName] = useState(experience.name)
  const [tipo, setTipo] = useState(experience.tipo)
  const [descripcion, setDescripcion] = useState(experience.descripcion)

  const me = useUser()

  const handleSubmit = async e => {
    e.preventDefault()
    await edit(me.token, experience.id, { name, tipo, descripcion })
  }

  return (
    <div className="create-experience">
      <h3>Edit experience:</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Tipo:
          <input type="text" value={tipo} onChange={e => setTipo(e.target.value)} />
        </label>
        <label>
          Descripcion:
          <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        </label>
        <button>Guardar</button>
      </form>
    </div>
  );
}

export default CreateExperience;
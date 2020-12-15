import { useState } from 'react'
import { createExperience,  useExperienceList } from '../Api'
import { useUser } from '../user/UserContext'
import './CreateExperience.css'

function CreateExperience() {
    const [name, setName] = useState('')
    const [tipo, setTipo] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const me = useUser()
    const experience = useExperienceList()
    const handleSubmit = async e => {
        e.preventDefault()
        await createExperience(me.token, experience, { name, tipo, descripcion })
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
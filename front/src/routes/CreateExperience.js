import { useState, useRef } from 'react'
import { createExperience } from '../Api'
import { useUser } from '../user/UserContext'
import './CreateExperience.css'


function CreateExperience() {
    const [name, setName] = useState('')
    const [tipo, setTipo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [preview, setPreview] = useState();
    const theInput = useRef();

    const me = useUser()
    const experience = createExperience()

    const handleSubmit = async e => {
        e.preventDefault();
        const imagen = e.target.imagen.files[0]
        await createExperience(me.token, experience, { name, tipo, descripcion, imagen })
    }
    const handleClick = e => {
        theInput.current.click()
    }
    const handlePick = e => {
        const reader = new FileReader()
        reader.onloadend = () => setPreview(reader.result)
        reader.readAsDataURL(e.target.files[0])
    }
    const style = preview && { backgroundImage: 'url(' + preview + ')' }

    return (
        <div className="create-experience">

            <h3>crear experiencia:</h3>

            <form onSubmit={handleSubmit}>
                <label>
                    imagen:
                <div
                        className="subir-imagen"
                        onClick={handleClick}
                        style={style}
                        value={preview}

                    >
                    </div>
                    <input
                        className="esconder"
                        type="file"
                        name="imagen"
                        ref={theInput}
                        accept="image/*"
                        onChange={handlePick} />
                </label>

                <label>
                    Nombre:
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
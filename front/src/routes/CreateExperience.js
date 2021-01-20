import { useState, useRef } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { createExperience } from '../Api'
import { useUser } from '../user/UserContext'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CreateExperience.css'


function CreateExperience() {
    const history = useHistory()
    const [nombre, setNombre] = useState('')
    const [tipo, setTipo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [localizacion, setLocalizacion] = useState('')
    const [preview, setPreview] = useState();
    const theInput = useRef();

    const me = useUser()

    if (!me) return <Redirect to="/login" />

    const handleSubmit = async e => {
        e.preventDefault();
        const imagen = e.target.imagen.files[0]
        const experiencia = await createExperience(me.token, { nombre, tipo, localizacion, descripcion, imagen })
        history.push('/experience/' + experiencia.id)
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
            <form onSubmit={handleSubmit}>
                <div >
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
                </div>

                <label>
                    <input type="text" placeholder="título ..." value={nombre} onChange={e => setNombre(e.target.value)} />
                </label>
                <label>
                    <select value={tipo} onChange={e => setTipo(e.target.value)}>
                        <option value="" hidden>tipo ...</option>
                        <option value="Naturaleza">Naturaleza</option>
                        <option value="Gastronomia">Gastronomia</option>
                        <option value="Senderismo">Senderismo</option>
                        <option value="Escalada">Escalada</option>
                        <option value="Bicicleta">Bicicleta</option>
                        <option value="Playa">Playa</option>
                        <option value="Fiesta">Fiesta</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Buceo">Buceo</option>

                    </select>
                </label>
                <label>
                    <select value={localizacion} onChange={e => setLocalizacion(e.target.value)}>
                        <option value="" hidden>Comunidad ...</option>
                        <option value="Andalucí­a">Andalucía</option>
                        <option value="Aragón">Aragón</option>
                        <option value="Asturias">Asturias</option>
                        <option value="Islas Baleares">Islas Baleares</option>
                        <option value="País Vasco">País Vasco</option>
                        <option value="Canarias">Canarias</option>
                        <option value="Cantabria">Cantabria</option>
                        <option value="Castilla-La Mancha">Castilla-La Mancha</option>
                        <option value="Castilla y León">Castilla y León</option>
                        <option value="Cataluña">Cataluña</option>
                        <option value="Extremadura">Extremadura</option>
                        <option value="Galicia">Galicia</option>
                        <option value="Madrid">Madrid</option>
                        <option value="Región de Murcia">Región de Murcia</option>
                        <option value="Comunidad Foral de Navarra">Navarra</option>
                        <option value="La Rioja">La Rioja</option>
                        <option value="Comunidad Valenciana">Comunidad Valenciana</option>
                        <option value="Ceuta">Ceuta</option>
                        <option value="Melilla">Melilla</option>
                    </select>
                </label>
                <label>
                    <ReactQuill className="descripcion" defaultValue={descripcion} onChange={setDescripcion} />
                </label>
                <button>Guardar</button>
            </form>
        </div>
    );
}

export default CreateExperience;
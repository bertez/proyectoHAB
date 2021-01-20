import { useHistory, useParams } from "react-router-dom";
import Results from './Results'
import Experiencias from './Experiencias'
import './Buscar.css'

const Buscar = () => {
    const history = useHistory()
    const { id } = useParams()

    const handleChange = e => {
        history.push('/location/' + e.target.value)
    }
   
    return (
        <div>
        <div className="buscar">
            <select value={id} onChange={handleChange}>
                <option value="" hidden>Selecciona...</option>
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
            {id && <Results id={id} />}
        </div>
        <Experiencias/>
        </div>
    )
}

export default Buscar

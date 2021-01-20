import { useHistory, useParams } from "react-router-dom";
import ResultTipo from './ResultTipo'
import Experiencias from './Experiencias'
import './BuscarTipo.css'


const BuscarTipo = () => {
    const history = useHistory()
    const { id } = useParams()

    const handleChange = e => {
        history.push('/tipo/' + e.target.value)
    }

    return (
        <div>
        <div className="buscarTipo">
            <select value={id} onChange={handleChange}>
                <option value="" hidden>Selecciona...</option>
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
            {id && <ResultTipo id={id} />}
        </div>
        <Experiencias/>
        </div>
    )
}

export default BuscarTipo
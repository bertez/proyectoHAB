import './Experiencias.css'
import spiderman from './images/spiderman.jpeg';
function Experiencias() {

    return (
        <ul className="Experience-list">
            <img src={spiderman} className="experiencias-img"/>
            <li>recomendaciones</li>
            <li> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</li>
        </ul>
    )
}

export default Experiencias
import { Link } from 'react-router-dom';
import { useExperienceList } from '../Api'
import './Experiencias.css'


function Experiencias() {

  const experiences = useExperienceList();

  if (!experiences) return "loading"

  return (
    <div className="experiencias">
      {experiences.map(experience =>
        <Link to={'/experience/' + experience.id}
          key={experience.id}>
          <div
            className="img-experience"
            style={{ backgroundImage: 'url(' + experience.imagen + ')' }}>
            <div className="experiencia-nombre"> {experience.nombre}</div>
          </div>
        </Link>
      )}
      
    </div>
  )
}



export default Experiencias;
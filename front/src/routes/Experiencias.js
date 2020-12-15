import useFetch from '../useFetch'
import ExperienceViewer from './ExperienceViewer'
import './Experiencias.css'

function Experiencias() {
  const experiences = useFetch('http://localhost:8080/experience')

  return (
    <div className="section experiences">
      
      {!experiences && 'Cargando...'}
      {experiences &&
        <div>
          <ExperienceViewer/>
        </div>
        
      }
    </div>
  );
}

export default Experiencias;
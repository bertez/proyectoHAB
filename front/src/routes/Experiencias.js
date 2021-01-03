import useFetch from '../useFetch'
import ExperienceViewer from './ExperienceViewer'
import './Experiencias.css'

function Experiencias() {
  const experiences = useFetch('http://localhost:3000/experiences')

  return (
    <div className="section_experiences">
      
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
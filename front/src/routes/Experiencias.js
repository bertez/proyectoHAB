import useFetch from '../useFetch'
import './Experiencias.css'

function Experiencias() {
  const experiences = useFetch('http://localhost:8080/experience')

  return (
    <div className="section experiences">
      
      {!experiences && 'Cargando...'}
      {experiences &&
        <div>
          {experiences}
        </div>
        
      }
    </div>
  );
}

export default Experiencias;
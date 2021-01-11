import { useExperienceList } from '../Api'
import './Experiencias.css'


function Experiencias() {

  const experiences = useExperienceList();
  
  if(!experiences) return "loading"

  return (
      <div >
        {experiences.map(experience => 
        <div className="experiencias">
          <div 
          key={experience}
          >
             <h2> {experience.nombre}</h2>
             <div
             className = "imagen"
             style={{ backgroundImage: 'url(' + experience.imagen + ')' }}>

             </div>
             <div className = "descripcion-exp">
               <p>{experience.descripcion}</p>
             </div>
             
          </div>
          </div>
          )}
      </div>
  )

  }
  


export default Experiencias;
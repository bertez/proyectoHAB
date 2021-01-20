
import { useExperienceByUserId } from '../Api';


const UserExperience = () => {
  const experiences = useExperienceByUserId()
  console.log(experiences);
  if (!experiences) return 'loading...';

  return (
    <div className="experiencias" >
      {experiences.map(experience =>
          <div
            className="imagen"
            style={{ backgroundImage: 'url(' + experience.imagen + ')' }}>
            <h2> {experience.nombre}</h2>
          </div>
       
      )}
    </div>
  )
}

export default UserExperience;
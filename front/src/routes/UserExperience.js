import {Link} from 'react-router-dom';
import {useExperienceById } from '../Api';

const UserExperience = () => {
    const experiences = useExperienceById()
    if(!experiences) return 'loading...';
    console.log( '-------------------------', experiences )
    return (
      <div>
      {experiences.map(experience =>
           <Link to={'/experience/' + experience.id}
           key={experience.id}>
           <div
             className="imagen"
             style={{ backgroundImage: 'url(' + experience.imagen + ')' }}>
             <h2> {experience.nombre}</h2>
           </div>
         </Link>
      )}
  </div>
    )
}

export default UserExperience;
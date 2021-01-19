import {Link} from 'react-router-dom';
import {useExperienceByTipo } from '../Api';

const ResultTipo = ({ id }) => {
    const experiences = useExperienceByTipo(id)
    if(!experiences) return 'loading...';
    return (
        <div>
            {experiences.map(experience =>
                <Link to={'/experience/' + experience.id}>
                    <div>
                        <div>{experience.nombre}</div>
                        <img src={ experience.imagen }/>
                        
                    </div>
                </Link>
            )}
        </div>
    )
}

export default ResultTipo
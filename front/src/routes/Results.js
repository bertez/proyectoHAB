import {Link} from 'react-router-dom';
import {useExperienceByLocation } from '../Api';
import './Results.css';

const Results = ({ id }) => {
    const experiences = useExperienceByLocation(id)
    if(!experiences) return 'loading...';
    return (
        <div className="result">
            {experiences.map(experience =>
                <Link to={'/experience/' + experience.id}>
                    <div className="resultCard">
                        <div>{experience.nombre}</div>
                        <img src={ experience.imagen }/>
                        
                    </div>
                </Link>
            )}
        </div>
    )
}

export default Results

import { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useExperienceById } from '../Api';
import { useUser } from '../user/UserContext';
import './Experiencia.css';
import CreateReview from './CreateReview';
import Reviews from './Reviews';

function Experiencia() {
    const me = useUser();
    const { id } = useParams();
    const experience = useExperienceById(id);
    const [key, setKey] = useState(0);

    if (!me) return <Redirect to="/login" />

    if (!experience) return "loading"

    return (
        <div className="experiencia" key={experience.id}>
                <div className="nombre"> {experience.nombre}</div>
                <div
                    className="imagen"
                    style={{ backgroundImage: 'url(' + experience.imagen + ')' }}>
                </div>
                <div 
                className="descripcion-exp"
                dangerouslySetInnerHTML={{__html: experience.descripcion}}
                >
                </div>
                <div>
                    <CreateReview experienceId={experience.id} refresh={() => setKey(key+1)} />
                </div>
                <div>
                    <Reviews key={key} />
                </div>

            
        </div>
    )

}



export default Experiencia;
import { Redirect, useParams } from 'react-router-dom';
import { useExperienceById } from '../Api'
import { useUser } from '../user/UserContext';
import CreateReview  from './CreateReview';
function Experiencia() {
    const me = useUser()
    const { id } = useParams()
    const experience = useExperienceById(id);
    if (!me) return <Redirect to="/login" />

    if (!experience) return "loading"

    return (
            <div className="experiencias" key={experience.id}>
                <div>
                    <h2> {experience.nombre}</h2>
                    <div
                        className="imagen"
                        style={{ backgroundImage: 'url(' + experience.imagen + ')' }}>

                    </div>
                    <div className="descripcion-exp">
                        <p>{experience.descripcion}</p>
               
                    </div>
                    <div>
                        <CreateReview experienceId ={experience.id} />
                    </div>

                </div>
            </div>
  )

  }
  


export default Experiencia;
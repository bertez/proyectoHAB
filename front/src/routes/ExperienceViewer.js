import { useExperienceById } from '../Api'
import CreateExperience from './CreateExperience'
import { useParams } from 'react-router-dom'

function ExperienceViewer() {
  const { id } = useParams()
  const experience = useExperienceById(id)

  if (!experience) return 'Loading ...'

  return (
    <div className="experience">
      <h2>{experience.name}</h2>
      <ul>
        <li>{experience.tipo}</li>
        <li>{experience.descripcion}</li>
      </ul>
      <CreateExperience key={experience.id} experience={experience} />
    </div>
  )
}

export default ExperienceViewer
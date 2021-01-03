import { useState } from 'react'
import { createCommentary } from '../Api'
import { useUser } from '../user/UserContext'
import './CreateExperience.css'

function CreateComentary() {
  const [text, setText] = useState('')


  const me = useUser()

  const handleSubmit = async e => {
    e.preventDefault()
    await createCommentary(me.token, commentary, { texto})
  }

  return (
    <div className="create-commentary">
      <h3>create commentary:</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Texto:
          <input value={text} onChange={e => setText(e.target.value)} />
        </label>
       
        <button>comentar</button>
      </form>
    </div>
  );
}

export default CreateComentary;
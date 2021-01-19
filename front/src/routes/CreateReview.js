import { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { createReview } from '../Api'
import { useUser } from '../user/UserContext'
//import './CreateReview.css'

function CreateReview({experienceId} ) {
  const history = useHistory()
  const [text, setText] = useState('')
  const [rating, setRating] = useState(1)

  const me = useUser()
  if (!me) return <Redirect to="/login" />
  const handleSubmit = async e => {
    e.preventDefault()
    const review = await createReview(me.token, { experienceId ,rating, text })
    history.push('/review/' + review.id)
  }

  return (
    <div className="create-review">

      <form onSubmit={handleSubmit}>
        <select name="select" value={rating} onChange={e => setRating(e.target.value)}>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
        <input type= "text" value={text} onChange={e => setText(e.target.value)} />
        <button>enviar</button>
      </form>
    </div>
  );
}

export default CreateReview;
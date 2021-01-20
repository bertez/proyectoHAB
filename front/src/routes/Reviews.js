
import { useReviewsList } from '../Api'
import './Reviews.css'


function Reviews() {

  const reviews = useReviewsList();

  if (!reviews) return "loading"

  return (
    <div >
      {reviews.map(review =>
          <div className="reviews">
            <div className="rating">{review.rating}</div>
            <div className="text-review"> {review.text}</div>
          </div>
        
      )}
    </div>
  )
}



export default Reviews;
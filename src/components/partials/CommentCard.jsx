import { useState } from "react"
import axios from "axios"
import "./CommentCard.css"
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider"

export default function CommentCard(props) {
    const comment = props.comment
    const currentUser = props.currentUser
    const [seeComment, setSeeComment] = useState(true)

    const handleRemoveComment = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/threads/comments/${comment._id}`)
            setSeeComment(false)
        } catch (error) {
            console.log(error)
        }
    }


    return (
<div className="comment-box">
  <div className="comment-user-info">
    <img src={currentUser.img} alt={currentUser.userName} className="comment-user-img" />
    <div className="comment-user-details">
      <div className="comment-username">{currentUser.userName}</div>
    </div>
  </div>
  <div className="comment-content">
    <div className="comment">
      <p className="comment-title">This is what they had to say:</p>
      <p className="comment-body">{comment.commentBody}</p>
      {currentUser._id === comment.userId && (
        <div className="comment-actions">
          <button onClick={handleRemoveComment}>Delete</button>
        </div>
      )}
    </div>
  </div>
</div>
    )
}    
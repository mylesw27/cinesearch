import { useEffect, useState } from "react"
import CommentCard from "./CommentCard"
import CommentForm from "./CommentForm"
import axios from "axios"
import './Thread.css'

export default function Thread(props) {
  const comments = props.comments
  const setComments = props.setComments
  const thread = props.thread
  const [seeComments, setSeeComments] = useState(false)
  const currentUser = props.currentUser
  const [seeThread, setSeeThread] = useState(true)


  const handleThreadClick = () => {
    setSeeComments(!seeComments)
  }

  const handleRemoveThread = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/threads/${thread._id}`)
      setSeeThread(false)
    } catch (err) {
      console.log(err)
    }
  }

  const commentsArray = comments.map((comment) => {
    if (comment.threadId === thread._id) {
      return (
        <CommentCard
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
        />
      )
    } else {
      return []
    }
  })

  return (
    <>
      {seeThread ?
        <div class="thread-container">
          <div class="thread-box">
            <div class="thread-user-info">
              <img src={thread.img} alt={thread.userName} class="thread-user-img" />
              <div class="thread-user-details">
                <div class="thread-username">{thread.userName} wrote:</div>
              </div>
            </div>
            <div class="thread-content">
              <h3 class="thread-title">{thread.threadTitle}</h3>
              <p class="thread-body">{thread.threadBody}</p>
            </div>
            {currentUser._id === thread.userId && (
              <div class="thread-actions">
                <button onClick={handleRemoveThread}>Remove Thread</button>
              </div>
            )}
          </div>
        </div>


        :
        <></>
      }
      {seeComments ?
        <>
          {commentsArray}
          <CommentForm
            currentUser={currentUser}
            thread={thread}
            comments={comments}
            setComments={setComments}
          />
        </>
        :
        <div className="see-thread-comments" onClick={handleThreadClick}>Click to see thread comments</div>
      }
    </>
  )
}

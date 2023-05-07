import { useEffect, useState } from "react"
import CommentCard from "./CommentCard"
import CommentForm from "./CommentForm"
import axios from "axios"

export default function Thread(props) {
    const comments = props.comments
    const setComments = props.setComments
    const thread = props.thread
    const [seeComments, setSeeComments] = useState(false)
    const currentUser = props.currentUser


    const handleThreadClick = () => {
        setSeeComments(!seeComments)
    }

    const handleRemoveThread = () => {
        try {
            console.log("remove thread")
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
        }
    })



    return (
        <div>
            <p>{thread.userName} wrote:</p>
            <h3>{thread.threadTitle}</h3>
            <h4>{thread.threadBody}</h4>
            {currentUser._id === thread.userId ?
                <div>
                    <button onClick={handleRemoveThread}>Remove Thread</button>
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
                <div onClick={handleThreadClick}>Click to see thread comments</div>}
        </div>
    )


}
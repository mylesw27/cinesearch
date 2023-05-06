import { useEffect, useState } from "react"
import CommentCard from "./CommentCard"

export default function Thread(props) {
    const comments = props.comments
    const thread = props.thread
    const [seeComments, setSeeComments] = useState(false)


    const handleThreadClick = () => {
        setSeeComments(!seeComments)
    }

    const commentsArray = comments.map((comment) => {
        if (comment.threadId === thread._id) {
            return (
                <CommentCard
                    key={comment.id}
                    comment={comment}
                />
            )
        }
    })



    return (
        <div>
            <p>{thread.userName} wrote:</p>
            <h3>{thread.threadTitle}</h3>
            <h4>{thread.threadBody}</h4>
            {seeComments ? <>{commentsArray}</> : <div onClick={handleThreadClick}>Click to see thread comments</div>}
            {/* {commentsArray} */}
        </div>
    )


}
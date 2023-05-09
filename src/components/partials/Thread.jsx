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
        }
    })

    return (
        <>
    {seeThread ?
        <div className="container mb-5 mt-5">
            <div className="card">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="text-center mb-5">{thread.threadTitle}</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="media">
                                    <img className="mr-3 rounded-circle" alt="Bootstrap Media Preview" src="https://i.imgur.com/stD0Q19.jpg" />
                                    <div className="media-body">
                                        <div className="row">
                                            <div className="col-8 d-flex">
                                                <h5>{thread.userName}</h5>
                                                {/* <span>- {comment.commentTitle}</span> */}
                                            </div>
                                            <div className="col-4">
                                                {currentUser._id === thread.userId &&
                                                    <div className="pull-right reply">
                                                        <button className="btn btn-danger" onClick={handleRemoveThread}>Remove Thread</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <p>{thread.threadBody}</p>
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
                                            <div className="clickable" onClick={handleThreadClick}>Click to see thread comments</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        : <></>
    }
</>

    )


}
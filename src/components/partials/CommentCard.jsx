import { useState } from "react"
import axios from "axios"
import "./Comments.css"
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
        <>
            {seeComment ?
                <>
                    <div>
                        <h4>{comment.userName}</h4>
                        <p>{comment.commentBody}</p>
                        {currentUser._id === comment.userId ?
                            <div>
                                <button onClick={handleRemoveComment}>x</button>
                            </div>
                            :
                            <></>
                        }
                    </div>
                </>
                :
                <></>
            }
        </>
    )
}

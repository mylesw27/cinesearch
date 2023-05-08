export default function CommentCard(props) {
    const comment = props.comment
    const currentUser = props.currentUser

    const handleRemoveComment = () => {
        try {
            await axios.delete(`${}`)
        }
    }


    return (
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
    )
}

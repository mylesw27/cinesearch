// imports

// export with comment in object destructing
export default function CommentCard(props) {
    const comment = props.comment
    return (
        <div>
            <h4>{comment.userName}</h4>
            <p>{comment.commentBody}</p>
        </div>
    )
}

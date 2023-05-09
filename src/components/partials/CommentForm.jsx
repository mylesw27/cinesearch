import { useState } from "react"
import axios from "axios"
import "./Comments.css"

export default function CommentForm(props) {
    const currentUser = props.currentUser
    const thread = props.thread
    const [form, setForm] = useState({
        threadId: thread._id,
        userId: currentUser._id,
        userName: currentUser.name,
        commentBody: ''
    })
    const comments = props.comments
    const setComments = props.setComments

    const handleSubmit = async (e, form) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/threads/comments`, form)
            const newComment = response.data.newComment
            setComments([...comments, newComment])
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <form onSubmit={e => handleSubmit(e, form)}>
                <label htmlFor="commentBody" className="c-form-title">Enter your comments:</label>
                <input className="c-form-input" type="textarea" value={form.commentBody} onChange={(e) => setForm({ ...form, commentBody: e.target.value })} />
                <button className="c-form-button" type="submit">Post Comment</button>
            </form>
        </>
    )
}
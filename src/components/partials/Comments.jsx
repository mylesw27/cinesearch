import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import Thread from './Thread'
import "./Comments.css"

export default function Comments2(props) {
    const movie = props.movie
    const jwt = localStorage.getItem('jwt')
    const [threads, setThreads] = useState([])
    const [comments, setComments] = useState([])
    const [form, setForm] = useState({ tmdbId: '', userId: '', userName: '', threadTitle: "", threadBody: "" })
    const [currentUser, setCurrentUser] = useState(props.currentUser)
    const navigate = useNavigate()

    useEffect(() => {
        const getComments = async () => {
            const allComments = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/threads/movie/${movie}`, {
                headers: { Authorization: `${jwt}` }
            })
            setThreads(allComments.data.findThreads)
            setComments(allComments.data.findComments)
        }
        getComments()
        if (currentUser) {
            setForm({ tmdbId: movie, userId: currentUser._id, userName: currentUser.name, threadTitle: "", threadBody: "" })
        }
    }, [])

    const threadsArray = threads.map((thread, i) => {
        return (
            <Thread
                key={`thread-${thread._id}`}
                thread={thread}
                comments={comments}
                setComments={setComments}
                currentUser={currentUser}
            />
        )
    })

    const handleSubmit = async (e, form) => {
        e.preventDefault()
        try {
            const postResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/threads`, form)
            const responseObject = postResponse.data.newThread
            setThreads([...threads, responseObject])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="thread-box">
            {currentUser ?
                <>


<div class="create-thread-container">

<form className="comments-form" onSubmit={e => handleSubmit(e, form)}>
  <h3 class="create-thread-header">Create a Thread</h3>
  <div class="create-thread-form">
    <div class="create-thread-user-info">
      <div class="create-thread-user-details">

      </div>
    </div>
    <div class="create-thread-inputs">
      <div class="create-thread-input-group">
        <label for="title">Thread Title:</label>
        <input type="text" id="title" value={form.threadTitle} onChange={(e) => setForm({ ...form, threadTitle: e.target.value })} />
      </div>
      <div class="create-thread-input-group">
        <label for="body">Thread Body:</label>
        <textarea className="create-thread-body"type="textarea" id="body" value={form.threadBody} onChange={(e) => setForm({ ...form, threadBody: e.target.value })} />
      </div>
    </div>
  </div>
  <button type="submit" class="create-thread-submit">Post Thread</button>
  </form>
  <div>
  {threadsArray}
  </div>
</div>




                </>
                : <h3>Please sign in to view discussions</h3>}
        </div>
    )
}

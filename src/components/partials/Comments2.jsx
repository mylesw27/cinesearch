import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import Thread from './Thread'

export default function Comments2(props) {
    const movie = props.movie
    const jwt = localStorage.getItem('jwt')
    const [threads, setThreads] = useState([])
    const [comments, setComments] = useState([])
    const [form, setForm] = useState({})
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
                // key={`thread-${thread._id}`}
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
        <>
            {currentUser ?
                <>
                    <h2>Discussions</h2>
                    <h3>Start a thread here:</h3>
                    <form onSubmit={e => handleSubmit(e, form)}>
                        {/* threadTitle */}
                        <label htmlFor="title">Thread Title:</label>
                        <input type="text" id="title" value={form.threadTitle} onChange={(e) => setForm({ ...form, threadTitle: e.target.value })} />
                        {/* threadBody */}
                        <label htmlFor="body">Thread Body:</label>
                        <textarea type="textarea" id="body" value={form.threadBody} onChange={(e) => setForm({ ...form, threadBody: e.target.value })} />

                        <button type="submit">Post Thread</button>
                    </form>
                    {threadsArray}
                </>
                : <h3>Please sign in to view discussions</h3>}
        </>
    )
}

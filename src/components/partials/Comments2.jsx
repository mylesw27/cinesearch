import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import Thread from './Thread'

export default function Comments2(props) {
    const movie = props.movie
    const jwt = localStorage.getItem('jwt')
    const [threads, setThreads] = useState([])
    const [comments, setComments] = useState([])


    useEffect(() => {
        const getComments = async () => {
            const allComments = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/threads/movie/${movie}`, {
                headers: { Authorization: `${jwt}` }
            })
            setThreads(allComments.data.findThreads)
            setComments(allComments.data.findComments)
        }
        getComments()
    }, [])

    const threadsArray = threads.map((thread, i) => {
        return (
            <Thread
                key={`thread-${thread._id}`}
                thread={thread}
                comments={comments}
            />
        )
    })

    return (
        <>
            <h2>Discussions</h2>
            {threadsArray}
        </>
    )
}

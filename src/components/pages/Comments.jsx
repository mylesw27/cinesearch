// import necessary modules
import { useState, useEffect } from "react";
import Comments2 from "../partials/Comments2";
// define the Comments component
export default function Comments({ currentUser }) {
  // define state variables for the list of comments, the text of a new comment being added, and the ID of a comment being edited
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  // use useEffect to get comments from local storage on mount and save comments to local storage on update
  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);
  // use useEffect to save comments to local storage on update
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);
  // define functions to handle the submit event for adding a new comment,
  const handleNewCommentSubmit = (event, commentId) => {
    event.preventDefault();
    const newComment = {
      date: Date.now(),
      text: newCommentText,
      author: currentUser.name,
    };
    setComments([...comments, newComment]);
    setNewCommentText("");
  };
  //the submit event for editing a comment,
  const handleEditCommentSubmit = (event, commentId) => {
    event.preventDefault();
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment, // this might cause error
          text: newCommentText,
        };
      } else {
        return comment;
      }
    });
    setComments(updatedComments);
    setNewCommentText("");
    setEditCommentId(null);
  };
  //and the delete event for a comment
  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };

  // define a function to render each comment
  const renderComment = (comment) => {
    // the function should include logic to render the comment differently if the comment is being edited or if the current user is the author of the comment
    if (editCommentId === comment.id) {
      return (
        <form onSubmit={(event) => handleEditCommentSubmit(event, comment.id)}>
          <input
            type="text"
            value={newCommentText}
            onChange={(event) => setNewCommentText(event.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      );
    } else {
      return (
        <div key={comment.id}>
          <p>{comment.text}</p>
          <p>by {comment.author}</p>
          {currentUser && currentUser.name === comment.author && (
            <div>
              <button onClick={() => setEditCommentId(comment.id)}>Edit</button>
              <button onClick={() => handleDeleteComment(comment.id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      );
    }
  };
  return (
    <div>
      <h2>Comments</h2>
      {comments.map(renderComment)}
      {currentUser && (
        <form onSubmit={handleNewCommentSubmit}>
          <input
            type="text"
            value={newCommentText}
            onChange={(event) => setNewCommentText(event.target.value)}
          />
          <button type="submit">Add Comment</button>
        </form>
      )}
    </div>    
  );
}

// render the Comments component
// the component should display the list of comments, a form to add a new comment if the user is logged in, and a form to edit a comment if the user is logged in and is the author of the comment

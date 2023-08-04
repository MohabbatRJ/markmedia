import React from 'react'

function CommentForm() {
  return (
    <>
      <form className="form-wrapper">
        <input type="text" className="form-control" placeholder="Your name" />
        <input type="text" className="form-control" placeholder="Email address" />
        <input type="text" className="form-control" placeholder="Website" />
        <textarea className="form-control" placeholder="Your comment"></textarea>
        <button type="submit" className="btn btn-primary">Submit Comment</button>
      </form>
    </>
  )
}

export default CommentForm

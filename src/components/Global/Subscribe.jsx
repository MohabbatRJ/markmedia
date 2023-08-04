import React from 'react'

function Subscribe() {
  return (
    <>

      <div className="newsletter-widget text-center align-self-center">
        <h3>Subscribe Today!</h3>
        <p>Subscribe to our weekly Newsletter and receive updates via email.</p>
        <form className="form-inline" method="post">
          <input type="text" name="email" placeholder="Add your email here.." required className="form-control" />
          <input type="submit" value="Subscribe" className="btn btn-default btn-block" />
        </form>
      </div>

    </>
  )
}

export default Subscribe

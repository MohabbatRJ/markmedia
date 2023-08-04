import React from 'react'
import { NavLink } from 'react-router-dom'

function PostSharing() {
  return (
    <>

      <ul className="list-inline">
        <li><NavLink to="/" className="fb-button btn btn-primary"><i className="fa fa-facebook"></i> <span className="down-mobile">Share on Facebook</span></NavLink></li>
        <li><NavLink to="/" className="tw-button btn btn-primary"><i className="fa fa-twitter"></i> <span className="down-mobile">Tweet on Twitter</span></NavLink></li>
        <li><NavLink to="/" className="gp-button btn btn-primary"><i className="fa fa-google-plus"></i></NavLink></li>
      </ul>
    </>
  )
}

export default PostSharing

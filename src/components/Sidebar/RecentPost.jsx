import React from 'react'
import { NavLink } from 'react-router-dom'

function RecentPost({ item: { title, date, slug, featuredImage, category } }) {
  
  return (
    <>
      <NavLink to={`/singleblog/${slug}`} className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="w-100 justify-content-between">
          <img src={featuredImage} alt="" className="img-fluid float-left" />
          <h5 className="mb-1">{title.rendered}</h5>
          <small>{date}</small>
        </div>
      </NavLink>
    </>
  )
}

export default RecentPost

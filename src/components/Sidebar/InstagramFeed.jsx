import React from 'react'
import { NavLink } from 'react-router-dom'

function InstagramFeed({ item: { image, srcLink } }) {
    return (
        <>
            <NavLink to={srcLink}>
                <img src={image} alt="" className="img-fluid" />
            </NavLink>
        </>
    )
}

export default InstagramFeed

import React from 'react'
import { NavLink } from 'react-router-dom';

function PopularPost({ pitem: { id, imagePopular, title, star, srcLink } }) {
    let stars = [];
    for (let i = 0; i <= star; i++) {
        stars.push(<i className='fa fa-star'></i>)
    }
    return (
        <>
            <NavLink to={srcLink} className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="w-100 justify-content-between">
                    <img src={imagePopular} alt={id} className="img-fluid float-left" />
                    <h5 className="mb-1">{title}</h5>
                    <span className="rating ">
                        {stars}
                    </span>
                </div>
            </NavLink>
        </>
    )
}

export default PopularPost

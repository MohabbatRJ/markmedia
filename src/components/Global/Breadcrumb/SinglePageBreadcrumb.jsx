import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';

function SinglePageBreadcrumb({ title }) {

    const location = useLocation();
    return (
        <>
            <ol className="breadcrumb hidden-xs-down">
                <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                <li className="breadcrumb-item"><NavLink to="/blog">{location.pathname.split('/')[1]}</NavLink></li>
                <li className="breadcrumb-item active">{title}</li>
            </ol>
        </>
    )
}

export default SinglePageBreadcrumb

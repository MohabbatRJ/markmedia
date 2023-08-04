import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function BreadCrumb(props) {
    // console.log(props.name, 'props')
    const location = useLocation();
    return (
        <>
            <div className="page-title db">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <h2 className='text-capitalize'> {props.name} <small className="hidden-xs-down hidden-sm-down">Nulla felis eros, varius sit amet volutpat non. </small></h2>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 hidden-xs-down hidden-sm-down">
                            <ol className="breadcrumb text-capitalize">
                                <li className="breadcrumb-item"><NavLink to="#">Home</NavLink></li>
                                <li className="breadcrumb-item"><NavLink to="#">{location.pathname.split('/')[1]}</NavLink></li>
                                {location.pathname.split('/')[2] ?
                                    <li className="breadcrumb-item active ">{location.pathname.split('/')[2]}</li> : null}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BreadCrumb

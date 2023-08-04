import React from 'react'
import { NavLink } from 'react-router-dom'


function Author({ item }) {


    return (
        <>
            {item ? (
                <div class="row">
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                        <img src={item._embedded["wp:featuredmedia"][0].source_url} alt="" class="img-fluid rounded-circle" />
                    </div>

                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                        <h4><NavLink href="#">{item.author}</NavLink></h4>
                        <p>{item.authorAbout}</p>


                    </div>
                </div>
            ) : (
                " "
            )}
        </>
    )
}

export default Author

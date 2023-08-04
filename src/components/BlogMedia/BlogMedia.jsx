import React from 'react'
import PostSharing from '../Global/PostSharing'
import { NavLink } from 'react-router-dom'

function BlogMedia({ item }) {

    // console.log(item, 'item')

    return (
        <>
            {item ? (
                <div>

                    <div key={item.id}>
                        <div className="post-media">
                            <NavLink to={`/singleblog/${item.slug}`} title="">
                                <img src={item._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url} alt="" className="img-fluid" />
                                <div className="hovereffect">
                                    <span></span>
                                </div>
                            </NavLink>
                        </div>

                        <div className="blog-meta big-meta text-center">
                            <div className="post-sharing">
                                <PostSharing />
                            </div>
                            <h4>
                                <NavLink to={`/singleblog/${item.slug}`} title="">{item.title.rendered}</NavLink>
                            </h4>
                            <p dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
                            {/* <p >{item.excerpt.rendered}</p> */}
                            <small>
                                <NavLink to={`/category/${item.category}`} title="">{item.category}</NavLink>
                            </small>
                            <small>
                                <NavLink to={`/category/${item.category}`} title="">{new Date(item.date).toDateString()}</NavLink>
                            </small>
                            <small>
                                <NavLink to={`/category/${item.category}`} title="">{item.author}</NavLink>
                            </small>
                            <small>
                                <NavLink to={`/category/${item.category}`} title=""><i className="fa fa-eye"></i> {item.views}</NavLink>
                            </small>
                        </div>

                    </div>

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )

}

export default BlogMedia

import React, { useState } from 'react'
import RecentPostData from '../../data/SideBarData/recentPostData'
import PopularCategory from '../Sidebar/PopularCategory'
import RecentPost from '../Sidebar/RecentPost'
import PopularPostData from '../../data/SideBarData/popularPostData'
import PopularPost from '../Sidebar/PopularPost'
import { NavLink } from 'react-router-dom'


function Footer({ recentPosts }) {
    const [popularPost, setPopularItem] = useState(PopularPostData)
    // const [recentPost, setRecentPost] = useState(RecentPostData)
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                            <div className="widget">
                                <h2 className="widget-title">Recent Posts</h2>
                                <div className="blog-list-widget">
                                    <div className="list-group">
                                        {recentPosts.map((item) => (
                                             <RecentPost key={item.id} item={item} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                            <div className="widget">
                                <h2 className="widget-title">Popular Posts</h2>
                                <div className="blog-list-widget">
                                    <div className="list-group">
                                        {popularPost.map((pitem) => {
                                            return <PopularPost key={pitem.id} pitem={pitem} />

                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                            <div className="widget">
                                <h2 className="widget-title">Popular Categories</h2>
                                <div className="link-widget">
                                    <ul>
                                        <PopularCategory />

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 text-center">
                            <br />
                            <br />
                            <div className="copyright">&copy; Markedia. Design: <NavLink to="http://html.design">HTML Design</NavLink>.</div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="dmtop">Scroll to Top</div>

        </>
    )
}

export default Footer

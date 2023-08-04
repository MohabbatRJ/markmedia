import React, { useState } from 'react'
import PopularCategory from './PopularCategory'
import InstagramFeed from './InstagramFeed'
import AdImage from './AdImage/AdImage'
import RecentPost from './RecentPost'
import Subscribe from '../Global/Subscribe'
import RecentPostData from '../../data/SideBarData/recentPostData'
import InstagramFeedData from '../../data/SideBarData/instagramFeedData'
import adImage from "../../assets/upload/banner_03.jpg"


function MainSideBar({ recentPosts }) {
    // console.log('recent', recentPosts)
    // const [recentPost, setRecentPost] = useState(RecentPostData)
    const [instaFeedItem, setInstaFeedItem] = useState(InstagramFeedData)


    return (
        <>
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <div className="sidebar">
                    <div className="widget-no-style">
                        <Subscribe />
                    </div>

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

                    <div id="" className="widget">
                        <h2 className="widget-title">Advertising</h2>
                        <div className="banner-spot clearfix">
                            <AdImage image={adImage} />
                        </div>
                    </div>

                    <div className="widget">
                        <h2 className="widget-title">Instagram Feed</h2>
                        <div className="instagram-wrapper clearfix">
                            {instaFeedItem.map((item) => {
                                return <InstagramFeed key={item.id} item={item} />
                            })}
                        </div>
                    </div>

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

            
        </>
    )
}

export default MainSideBar

import React, { useState } from 'react'
import blogData from '../../data/MarketingBlog/blogData'
import RecentPostData from '../../data/SideBarData/recentPostData'
import InstagramFeedData from '../../data/SideBarData/instagramFeedData'
import PopularCategoryData from '../../data/SideBarData/popularCategoryData'
import Pagination from '../../components/Global/Pagination'
import BlogMedia from '../../components/BlogMedia/BlogMedia'
import MainSideBar from '../../components/Sidebar/MainSideBar'

function AllMarketingBlog() {
    const [items, setItems] = useState(blogData)
    const [recentPost, setRecentPost] = useState(RecentPostData)
    const [instaFeedItem, setInstaFeedItem] = useState(InstagramFeedData)
    const [popularCategory, setPopularCategory] = useState(PopularCategoryData)
    return (
        <>
            <section className="section lb">
                <div className="container">
                    <div className="row">
                        <MainSideBar />
                        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                            <div className="page-wrapper">
                                <div className="blog-custom-build">
                                    <div className="blog-box wow fadeIn">

                                        <BlogMedia />

                                    </div>
                                </div>
                            </div>
                            <Pagination />
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default AllMarketingBlog

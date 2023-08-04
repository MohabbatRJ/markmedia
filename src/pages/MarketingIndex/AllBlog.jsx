import React, { lazy, useEffect, useState } from 'react'
import BlogMedia from '../../components/BlogMedia/BlogMedia'
import Pagination from '../../components/Global/Pagination'
import MainSideBar from '../../components/Sidebar/MainSideBar'
import Footer from '../../components/Global/Footer';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


function AllBlog() {

    const [posts, setPosts] = useState([]);
    const [views, setViews] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [recentPosts, setRecentPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const postsPerPage = 2;

    const handleIncrementViews = () => {
        setViews(views + 1);
    };


    const getPosts = async () => {

        setLoading(true)
        const postres = await fetch(`http://localhost/wordpress/wp-json/wp/v2/posts?page=1&_embed`);
        const postData = await postres.json();

        postData.sort((a, b) => new Date(b.date) - new Date(a.date));

        const recentPost = postData.slice(0, 3);
        // console.log('recentPosts', postData)
        const postsWithImages = await Promise.all(
            recentPost.map(async (post) => {
                const featuredMediaId = post.featured_media;
                if (featuredMediaId) {
                    const mediaResponse = await fetch(
                        `http://localhost/wordpress/wp-json/wp/v2/media/${featuredMediaId}`
                    );
                    const mediaData = await mediaResponse.json();
                    return {
                        ...post,
                        featuredImage: mediaData.source_url,
                    };
                } else {
                    return post;
                }
            })
        );
        setRecentPosts(postsWithImages)

        const postsWithAuthorCategoryAndViews = await Promise.all(
            postData.map(async (post) => {
                const authorRes = await fetch(post._links.author[0].href);
                const authorData = await authorRes.json();

                const categoriesRes = await fetch(post._links['wp:term'][0].href);
                const categoriesData = await categoriesRes.json();

                const viewsRes = await fetch(`http://localhost/wordpress/wp-json/wp/v2/posts/${post.id}/views`);
                const viewsData = await viewsRes.json();
                const views = viewsData.views || 0;


                return {
                    ...post,
                    author: authorData.name,
                    category: categoriesData.length > 0 ? categoriesData[0].name : 'Uncategorized',
                    views: views,
                };
            })
        );

        setPosts(postsWithAuthorCategoryAndViews);
        setLoading(false)
    };

    // const getPopularPosts = async () => {
    //     try {
    //         const popularPostsResponse = await fetch(
    //             'http://localhost/wordpress/wp-json/wp/v2/posts?_embed&orderby=meta_value_num&meta_key=views&order=desc&per_page=1'
    //         );
    //         const popularPostsData = await popularPostsResponse.json();

    //         const popularPostsWithImages = await Promise.all(
    //             popularPostsData.map(async (post) => {
    //                 const featuredMediaId = post.featured_media;
    //                 if (featuredMediaId) {
    //                     const mediaResponse = await fetch(
    //                         `http://localhost/wordpress/wp-json/wp/v2/media/${featuredMediaId}`
    //                     );
    //                     const mediaData = await mediaResponse.json();
    //                     return {
    //                         ...post,
    //                         featuredImage: mediaData.source_url,
    //                     };
    //                 } else {
    //                     return post;
    //                 }
    //             })
    //         );

    //         setPopularPosts(popularPostsWithImages);
    //     } catch (error) {
    //         console.error('Error fetching popular posts:', error);
    //     }
    // };

    // console.log('all blog', popularPosts)
    useEffect(() => {

        getPosts();
        // getPopularPosts();
    }, [])


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        // navigate(`/page/${pageNumber}`);
    };

    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== Math.ceil(posts.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);



    const Loading = () => {
        return (
            <>
                <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12 '>
                    <Skeleton baseColor='#ccc' height={400} width={700} />
                    <Skeleton baseColor='#ccc' height={80} width={700} />
                    <Skeleton baseColor='#ccc' height={60} width={700} />
                    <Skeleton baseColor='#ccc' height={80} width={700} />
                    <Skeleton baseColor='#ccc' height={50} width={700} />
                </div>
                
                
                
            </>
        )
    }
    const SideLoading = () => {
        return (
            <>
                <div className='col-lg-4 col-md-12 col-sm-12 col-xs-12'>
                    <Skeleton baseColor='#ccc' height={360} width={350} />
                    <Skeleton baseColor='#ccc' height={360} width={350} />
                    <Skeleton baseColor='#ccc' height={360} width={350} />
                    <Skeleton baseColor='#ccc' height={360} width={350} />
                    <Skeleton baseColor='#ccc' height={360} width={350} />
                </div>
                
                
            </>
        )
    }


    return (
        <>
            
                <section className="section lb">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
            {loading ? <Loading /> : (
                                <div className="page-wrapper">
                                    <div className="blog-custom-build">
                                        <div className="blog-box wow fadeIn">
                                            {currentPosts.map((item, index) => {
                                                return <BlogMedia key={index} item={item} />
                                            })}
                                        </div>
                                    </div>
                                </div>
                                    )}
                                <Pagination postsPerPage={postsPerPage}
                                    totalPosts={posts.length}
                                    paginate={paginate}
                                    previousPage={previousPage}
                                    nextPage={nextPage} />

                            </div>

                        {
                            loading ? <SideLoading/> :
                                <MainSideBar recentPosts={recentPosts} /> 
                            }
                            
                            </div>
                            </div>
                            </section>
                <Footer recentPosts={recentPosts} />
            
        </>
    )
}

export default AllBlog

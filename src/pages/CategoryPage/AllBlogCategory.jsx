import React, { useEffect, useState } from 'react'
import BlogMedia from '../../components/BlogMedia/BlogMedia'
import Pagination from '../../components/Global/Pagination'
import { useParams } from 'react-router-dom'
import BreadCrumb from '../../components/Global/Breadcrumb/BreadCrumb'
import MainSideBar from '../../components/Sidebar/MainSideBar'
import Footer from '../../components/Global/Footer'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


function AllBlogCategory() {
    const { slug } = useParams();


    const [posts, setPosts] = useState([]);
    const [catName, setCatName] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [recentPosts, setRecentPosts] = useState([]);
    const postsPerPage = 2;

    useEffect(() => {
        
        const fetchCategoryPostsAuthorTagsAndViews = async () => {
            try {
                const categoryResponse = await fetch(
                    `http://localhost/wordpress/wp-json/wp/v2/categories?slug=${slug}`
                    );
                    const categoryData = await categoryResponse.json();
                    const categoryId = categoryData[0]?.id;
                    const categoryName = categoryData[0]?.name;
                    setCatName(categoryName);
                    setLoading(true)


                
                const postsResponse = await fetch(
                    `http://localhost/wordpress/wp-json/wp/v2/posts?categories=${categoryId}&_embed`
                );
                const postsData = await postsResponse.json();

                postsData.sort((a, b) => new Date(b.date) - new Date(a.date));

                const recentPosts = postsData.slice(0, 3);
                const postsWithImages = await Promise.all(
                    recentPosts.map(async (post) => {
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
                    postsData.map(async (post) => {
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
            } catch (error) {
                console.error('Error fetching data:', error);
                
            }
        };

        const fetchAllCategoriesAndTags = async () => {
            try {
                const categoriesResponse = await fetch(
                    'http://localhost/wordpress/wp-json/wp/v2/categories'
                );
                const categoriesData = await categoriesResponse.json();

                const categoryPromises = categoriesData.map(async (category) => {
                    const categoryId = category.id;
                    const postsCountResponse = await fetch(
                        `http://localhost/wordpress/wp-json/wp/v2/posts?categories=${categoryId}`
                    );
                    const postsCountData = await postsCountResponse.json();
                    return {
                        ...category,
                        totalPosts: postsCountData.length,
                    };
                });



                const categoriesWithPostCount = await Promise.all(categoryPromises);

                const filteredCategories = categoriesWithPostCount.filter(
                    (category) => category.id !== 1 && category.slug !== 'uncategorized'
                );



                setCategories(filteredCategories);
            } catch (error) {
                console.error('Error fetching categories and tags:', error);
            }
        };

        
        Promise.all([fetchCategoryPostsAuthorTagsAndViews(), fetchAllCategoriesAndTags()]);
    }, [slug]);

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
            <BreadCrumb name={catName} />
            <section className="section lb">


                <div className="container">
                    <div className="row">
                        {
                            loading ? <SideLoading /> :
                                <MainSideBar recentPosts={recentPosts} />
                        }
                        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                            {loading ? <Loading /> : 
                            <div className="page-wrapper">
                                <div className="blog-custom-build">
                                    <div className="blog-box wow fadeIn">
                                        {
                                            posts.map((item) => (
                                                <BlogMedia key={item.id} item={item} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                                    }
                            <Pagination postsPerPage={postsPerPage}
                                totalPosts={posts.length}
                                paginate={paginate}
                                previousPage={previousPage}
                                nextPage={nextPage} />
                        </div>

                    </div>
                </div>
            </section>

            <Footer recentPosts={recentPosts} />
        </>
    )
}

export default AllBlogCategory

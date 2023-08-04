import React, { useEffect, useState } from 'react'
import Pagination from '../../components/Global/Pagination'
import BlogMedia from '../../components/BlogMedia/BlogMedia'
import BreadCrumb from '../../components/Global/Breadcrumb/BreadCrumb'
import { useParams } from 'react-router-dom'
import MainSideBar from '../../components/Sidebar/MainSideBar'
import Footer from '../../components/Global/Footer'

function AllBlogTags() {

    const { slug } = useParams();

    const [posts, setPosts] = useState([]);
    const [catName, setCatName] = useState([]);
    const [tagName, setTagName] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [recentPosts, setRecentPosts] = useState([]);
    const postsPerPage = 2;

    useEffect(() => {
        const postsWithAuthorCategoryTagsAndViews = async () => {
            try {

                const categoryResponse = await fetch(
                    `http://localhost/wordpress/wp-json/wp/v2/categories?slug=${slug}`
                );
                const categoryData = await categoryResponse.json();
                const categoryName = categoryData[0]?.name;
                setCatName(categoryName);

                const tagResponse = await fetch(
                    `http://localhost/wordpress/wp-json/wp/v2/tags?slug=${slug}`
                );
                const tagData = await tagResponse.json();
                const tagId = tagData[0]?.id;
                const tagName = tagData[0]?.name;
                setTagName(tagName);

                const postsWithTagResponse = await fetch(
                    `http://localhost/wordpress/wp-json/wp/v2/posts?tags=${tagId}&_embed`
                );
                const postsWithTagData = await postsWithTagResponse.json();
                postsWithTagData.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                const recentPosts = postsWithTagData.slice(0, 3);
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


                const postsWithAuthorCategoryTagsAndViews = await Promise.all(
                    postsWithTagData.map(async (post) => {
                        const authorRes = await fetch(post._links.author[0].href);
                        const authorData = await authorRes.json();

                        const categoriesRes = await fetch(post._links['wp:term'][0].href);
                        const categoriesData = await categoriesRes.json();

                        const viewsRes = await fetch(`http://localhost/wordpress/wp-json/wp/v2/posts/${post.id}/views`);
                        const viewsData = await viewsRes.json();
                        const views = viewsData.views || 0;

                        const tagsRes = await fetch(post._links['wp:term'][1].href);
                        const tagsData = await tagsRes.json();
                        const tags = tagsData.map((tag) => tag.name);

                        return {
                            ...post,
                            author: authorData.name,
                            category: categoriesData.length > 0 ? categoriesData[0].name : 'Uncategorized',
                            tags: tags,
                            views: views,
                        };
                    })
                );

                setPosts(postsWithAuthorCategoryTagsAndViews);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        const fetchAllTags = async () => {
            try {

                const tagsResponse = await fetch(
                    'http://localhost/wordpress/wp-json/wp/v2/tags'
                );
                const tagsData = await tagsResponse.json();


                const tagPromises = tagsData.map(async (tag) => {
                    const tagId = tag.id;
                    const postsWithTagResponse = await fetch(
                        `http://localhost/wordpress/wp-json/wp/v2/posts?tags=${tagId}`
                    );
                    const postsWithTagData = await postsWithTagResponse.json();
                    return {
                        ...tag,
                        totalPosts: postsWithTagData.length,
                    };
                });


                const tagsWithPostCount = await Promise.all(tagPromises);

                const filteredTagsWithPostCount = tagsWithPostCount.filter(
                    (tag) => tag.totalPosts > 0
                );


                setTags(filteredTagsWithPostCount);
            } catch (error) {
                console.error('Error fetching categories and tags:', error);
            }
        };

        Promise.all([postsWithAuthorCategoryTagsAndViews(), fetchAllTags()]);
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


    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <BreadCrumb name={tagName} />
            <section className="section lb">

                <div className="container">
                    <div className="row">
                        <MainSideBar recentPosts={recentPosts} />
                        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
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

export default AllBlogTags

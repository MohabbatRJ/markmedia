import SinglePageBreadcrumb from '../Global/Breadcrumb/SinglePageBreadcrumb'
import { NavLink, useParams } from 'react-router-dom'
import PostSharing from '../Global/PostSharing'
import { useEffect, useState } from 'react';
import AdImage from '../Sidebar/AdImage/AdImage';
import adImage from '../../assets/upload/banner_01.jpg'
import Author from '../Global/Author/Author';
import YouMayLike from './YouLike/YouMayLike';
import CommentForm from './CommentBox/CommentForm';
import MainSideBar from '../Sidebar/MainSideBar';
import Footer from '../Global/Footer';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function SinglePage() {
    const { slug } = useParams();
    // console.log(slug, 'slug')
    const [posts, setPosts] = useState([]);
    const [item, setItem] = useState(null);

    const [category, setCategory] = useState([])
    const [tags, setTags] = useState([])
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        
        getPosts();
        getCat();
        getTags();

    }, []);
    useEffect(() => {
        getPostItem();
    });

    const getPosts = async () => {
        setLoading(true)
        const postres = await fetch('http://localhost/wordpress/wp-json/wp/v2/posts?page=1&_embed');
        const postData = await postres.json();
        postData.sort((a, b) => new Date(b.date) - new Date(a.date));

        const recentPosts = postData.slice(0, 3);
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
            
            postData.map(async (post) => {
                setLoading(true)
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
                    views: views,
                    tags: tags,
                };
            })
        );

        setPosts(postsWithAuthorCategoryAndViews);
        setLoading(false)
    };

    useEffect(() => {
        getPosts();
    }, [])
    const getPostItem = () => {
        let item = posts.find((item) => item.slug === slug);
        if (item) {
            setItem(item)
        }
    }

    const getCat = async () => {
    
        const catRes = await fetch('http://localhost/wordpress/wp-json/wp/v2/categories');
        const catData = await catRes.json();

        setCategory(catData);
        
    }

    const getTags = async () => {
    
        const tagRes = await fetch('http://localhost/wordpress/wp-json/wp/v2/tags');
        const tagData = await tagRes.json();

        setTags(tagData);
        
    }


    // console.log(posts, 'posts')

    const Loading = () => {
        return (
            <>
                <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12 '>
                    <Skeleton baseColor='#ccc' height={30} width={700} />
                    <Skeleton baseColor='#ccc' height={30} width={100} />
                    <Skeleton baseColor='#ccc' height={150} width={700} />
                    <Skeleton baseColor='#ccc' height={20} width={700} />
                    <Skeleton baseColor='#ccc' height={60} width={700} />
                    <Skeleton baseColor='#ccc' height={360} width={700} />
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
            {item ? (
                <section className="section lb m3rem">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                                {loading ? <Loading /> : 
                                <div className="page-wrapper">
                                    <div className="blog-title-area">
                                        <SinglePageBreadcrumb title={item.title.rendered} />
                                        <div>

                                            <span className="color-yellow">
                                                <NavLink to={`/category/${item.category}`}>{item.category}</NavLink>
                                            </span>

                                        </div>



                                        <h3>{item.title.rendered}</h3>

                                        <div className="blog-meta big-meta">
                                            <small><NavLink to={`/singleblog/${slug}`} title="">{new Date(item.date).toDateString()}</NavLink></small>
                                            <small><NavLink to={`/singleblog/${slug}`} title="">{item.author}</NavLink></small>
                                            <small><NavLink to={`/singleblog/${slug}`} title=""><i className="fa fa-eye"></i> {item.views}</NavLink></small>
                                        </div>

                                        <div className="post-sharing">
                                            <ul className="list-inline">
                                                <PostSharing />
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="single-post-media">
                                        <img src={item._embedded["wp:featuredmedia"][0].source_url} alt="" className="img-fluid" />
                                    </div>

                                    <div className="blog-content">
                                        <div className="pp">


                                            <p dangerouslySetInnerHTML={{ __html: item.content.rendered }}></p>
                                        </div>
                                    </div>

                                    <div className="blog-title-area">
                                        <div className="tag-cloud-single">
                                            <span>Tags</span>
                                            {
                                                item.tags.map((tag) => (



                                                    <small>
                                                        {
                                                            <NavLink to={`/tags/${tag}`}>
                                                                {tag}
                                                            </NavLink>
                                                        }
                                                    </small>

                                                ))
                                            }


                                        </div>

                                        <div className="post-sharing">
                                            <PostSharing />
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="banner-spot clearfix">
                                                <AdImage image={adImage} />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="custombox authorbox clearfix mt-5">
                                        <h4 className="small-title">About author</h4>

                                        <Author item={item} />
                                    </div>


                                    <div className="custombox clearfix mt-5">
                                        <h4 className="small-title">You may also like</h4>
                                        <div className="row">
                                            <YouMayLike />
                                        </div>
                                    </div>




                                    <div className="custombox clearfix mt-5">
                                        <h4 className="small-title">Leave a Reply</h4>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <CommentForm />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>

                            {
                                loading ? <SideLoading /> :
                                    <MainSideBar recentPosts={recentPosts} />
                            }
                        </div>
                    </div>

                </section>
            ) : (
                " "
            )}

            {/* <Footer recentPosts={recentPosts} /> */}
        </>
    )
}

export default SinglePage

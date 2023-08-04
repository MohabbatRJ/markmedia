import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import CommentData from '../../../data/CommentData/CommentData'
import blogData from '../../../data/MarketingBlog/blogData';

function Comment({ postId }) {
    console.log(postId, 'postid');
    // const authorHTML = author.toString();
    const [item, setItem] = useState(null);
    // console.log('authorHTML', authorHTML)
    const { id } = useParams();

    useEffect(() => {
        let itemComment = CommentData.find((item) => item.postId === postId);
        console.log(itemComment, 'itemComment')
        let itemBlog = blogData.find((item) => item.postId === parseInt(id));
        if (itemComment.postId === itemBlog.postId) {
            setItem(itemComment)
        }

    }, []);

    console.log(item, 'item')



    return (
        <>
            {item ? (
                <div>
                    {item.comments.map((items) => {

                        return <div>
                            <h4 className="small-title">{item.comments.length} Comments</h4>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="comments-list">
                                        <div className="media">
                                            <NavLink className="media-left" to="#">
                                                <img src={items.userImg} alt="" className="rounded-circle" />
                                            </NavLink>
                                            <div className="media-body">
                                                <h4 className="media-heading user_name">{items.userName}<small>{items.days} days ago</small></h4>
                                                <p>{items.userComment}</p>
                                                <NavLink to="#" className="btn btn-primary btn-sm">Reply</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                    }
                </div>
            ) : (
                " "
            )}
        </>
    )
}

export default Comment

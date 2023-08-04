import React, { useEffect, useState } from 'react'
import blogData from '../../../data/MarketingBlog/blogData';
import { NavLink } from 'react-router-dom';

function YouMayLike() {
    const [items, setItems] = useState(blogData);
    const getItems = items.map((item) => {
        return item
    })
    const [randomObjects, setRandomObjects] = useState([]);

    useEffect(() => {
        // Ensure that the posts array is not empty
        if (getItems.length === 0) {
            return;
        }
        const randomIndexes = [];
        while (randomIndexes.length < 2) {
            const randomIndex = Math.floor(Math.random() * getItems.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }

        const randomPostsArray = randomIndexes.map((index) => getItems[index]);
        setRandomObjects(randomPostsArray);
    }, []);
    // console.log(randomObjects)
    return (
        <>
            {/* <button onClick={getRandomObject}>Show Random Posts</button> */}
            {randomObjects.map((obj) => (


                <div class="col-lg-6">
                    <div class="blog-box">
                        <div class="post-media">
                            <NavLink to={`/singleblog/${obj.id}`} title="">
                                <img src={obj.image} alt="" class="img-fluid" />
                                <div class="hovereffect">
                                    <span class=""></span>
                                </div>
                            </NavLink>
                        </div>
                        <div class="blog-meta">
                            <h4><NavLink to={`/singleblog/${obj.id}`} title="">{obj.title.slice(0, 35)}</NavLink></h4>
                            <small><NavLink to="blog-category-01.html" title="">{obj.category}</NavLink></small>
                            <small><NavLink to="blog-category-01.html" title="">{obj.date}</NavLink></small>
                        </div>
                    </div>
                </div>

            ))}
        </>
    )
}

export default YouMayLike

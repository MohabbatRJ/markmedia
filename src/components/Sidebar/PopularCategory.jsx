import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function PopularCategory() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAllCategories = async () => {
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
                // console.log('categoriesWithPostCount', categoriesWithPostCount)
                const filteredCategories = categoriesWithPostCount.filter(
                    (category) => category.id !== 1 && category.slug !== 'uncategorized'
                );
                setCategories(filteredCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        Promise.all([fetchAllCategories()]);
    }, []);

    // console.log(categories, 'categories')


    return (
        <>
            {categories.map((item) => (
                <li>
                    <NavLink className='block' to={`/category/${item.slug}`}> {item.name}
                        <span className=''>({item.totalPosts})</span>
                    </NavLink>
                </li>
            ))}
        </>
    )
}

export default PopularCategory

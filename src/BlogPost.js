import React, { useState, useEffect } from 'react';
import "./BlogPosts.css";

const BlogPosts = () => {

    //state management 
    const [post, setPost] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {

        //fetch API call
        const fetchPost = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                if (!response.ok) {
                    throw new Error('Data fetching failed');
                }
                const data = await response.json();
                setPost(data);
            } catch (err) {
                //store the error message in the state and not log it to the console
                setError(err.message);
            }
        };

        fetchPost();
    }, []); //empty dependency array ensures this runs only once

    //conditional rendering 
    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div className='blog-container'>
            <h1>Posts</h1>
            <ol className='post-list'>
                {post.map((post) =>
                    <li key={post.id} className='post-item'>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                )}
            </ol>
        </div>
    );
};

export default BlogPosts;
import {useEffect, useState} from "react";
import axios from "axios";

export const useFetchBlogById =  (blogId, setFormData, setImage) =>
{
    useEffect(() => {
        if(blogId)
        {
            const fetchBlog = async () =>
            {
                try
                {
                    const response = await axios.get(`/api/blog?id=${blogId}`);
                    if(response.data.success)
                    {
                        console.log(response.data.blog); // Add this line to inspect the blog data
                        setFormData(response.data.blog);
                        setImage(response.data.blog.image || null);
                    }
                    else
                    {
                        console.error("Blog not found.");
                    }

                }
                catch(error)
                {
                    console.error('Error fetching blog:', error);
                }
            };
            fetchBlog();
        }
    }, [blogId, setFormData, setImage]);
};
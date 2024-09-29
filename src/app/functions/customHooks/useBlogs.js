import {useEffect, useState} from "react";
import axios from "axios";

export const useBlogs = () =>
{
    const [blogs, setBlogs] = useState([]);
    // state to manage loading
    const [loading, setLoading] = useState(true);
    // state to handle errors
    const [error, setError] = useState(null);

    // fetch blog data from the server
    const fetchBlogs = async () =>
    {
        try
        {
            const response = await axios.get(`/api/blog`);
            setBlogs(response.data.blogs);
            setLoading(false);
        }
        catch (error)
        {
            setError(error);
            setLoading(false);
        }
    };

    // fetch blogs on component mount
    useEffect(() => {
        fetchBlogs();
    },[]);
    return {blogs, loading, error,setBlogs};
};
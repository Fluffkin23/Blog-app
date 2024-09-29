import { useState, useEffect } from 'react';
import axios from 'axios';

export const fetchBlog = (id) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get('/api/blog', { params: { id } });
            setData(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchBlogData();
        }
    }, [id]);

    return { data, loading, error };
};
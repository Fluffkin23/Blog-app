"use client";
import { Button, CardActionArea, Container, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useState,useEffect } from "react";
import BlogItem from "./BlogItem";

export default function BlogList() {

    // State to handle the currently active category filter
    const [menu, setMenu] = useState('All');
    // State to store blogs posts
    const [blogs, setBlogs] = useState([]);

    // Fetch blog data from the server
    const fetchBlogs = async () => {
        const response = await axios.get('/api/blog');
        // Update state with fetched blogs
        setBlogs(response.data.blogs);
    }

    // Effect to fetch blogs on component mount
    useEffect(() => {
        fetchBlogs();
    },[]);

    return (
        <Container>
            {/** Title of the Blog List page */}
            <Typography variant="h4" align="center" gutterBottom>Blog Posts</Typography>

            {/** Category filter buttons */}
            <Stack direction="row" justifyContent="center" spacing={3} sx={{my:15}}>
                {/** Maps over categories array to render buttons dynamically */}
                {['All', 'Technology','Startup','Lifestyle'].map((category) => (
                    // key - Unique key for each button, necessary for React's list rendering
                    // Contained style if selected, otherwise outlined
                    <Button key={category} onClick={() => setMenu(category)} variant={menu === category ? 'contained':'outlined'} color="primary">
                        {category}
                    </Button>
                ))}
            </Stack>

            {/** Grid Layout for displaying blog items */}
            <Grid container spacing={4}>
                {/** Filters blogs based on selected category and maps to Grid items */}
                {blogs.filter(blog => menu == 'All' || blog.category === menu).map((blog, index) => (
                    <Grid items xs={12} sm={6} md={4} key={index}>
                        {/** Link to the individual blog post */}
                        <Link href={`/pages/single_post/${blog._id}`}>
                            <CardActionArea sx={{my:5}}>
                                <BlogItem title={blog.title} summary={blog.summary} image={blog.image}></BlogItem>
                            </CardActionArea>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
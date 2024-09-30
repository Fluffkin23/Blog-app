"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSearchParams } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";

export default function EditBlogPage() {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        title: "",
        description: "",
        summary: "",
        category: "",
        author: "",
        authorImage: ""
    });
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const blogId = searchParams.get('id'); // Get the blog ID from the URL
    // Fetch the blog post details using the blog ID
    useEffect(() => {
        if (blogId) {
            const fetchBlog = async () => {
                try {
                    const response = await axios.get(`/api/blog?id=${blogId}`);
                    const blog = response.data;
                    setData({
                        title: blog.title,
                        description: blog.description,
                        summary: blog.summary,
                        category: blog.category,
                        author: blog.author,
                        authorImage: blog.authorImage
                    });
                    setImage(blog.image); // Assuming the image is stored as a URL
                } catch (error) {
                    console.error('Error fetching blog:', error);
                }
            };
            fetchBlog();
        }
    }, [blogId]);
    if (status === 'loading') {
        return <p>Loading....</p>;
    }
    if (!session) {
        return <p>You need to be logged in to view this page</p>;
    }
    const { name, profile_pic, role } = session.user;
    if (role !== 'admin') {
        return <p>You need to be an admin to view this page</p>;
    }
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(data => ({ ...data, [name]: value }));
    };
    const onDescriptionChange = (value) => {
        setData(data => ({ ...data, description: value }));
    };
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('summary', data.summary);
        formData.append('category', data.category);
        formData.append('author', name);
        formData.append('authorImage', profile_pic);
        formData.append('image', image);
        try {
            const response = await axios.put(`/api/blog?id=${blogId}`, formData);  // Send a PUT request to update the blog
            if (response.data.success) {
                toast.success(response.data.msg);
                setImage(null);
                setData({
                    title: "",
                    description: "",
                    summary: "",
                    category: "",
                    author: name,
                    authorImage: profile_pic
                });
            } else {
                throw new Error('Update failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error");
        }
    };
    return (
        <Box component="form" onSubmit={onSubmitHandler} sx={{ p: 2 }}>
            <Typography variant="h6">Edit Blog</Typography>
            <label htmlFor='image'>
                {image ? (
                    <img
                        src={typeof image === 'string' ? image : URL.createObjectURL(image)} // Display the existing image or newly selected image
                        alt='Blog Thumbnail'
                        width={140}
                        height={70}
                    />
                ) : (
                    <PhotoCameraIcon sx={{ fontSize: 70 }} />
                )}
            </label>
            <TextField
                hidden
                type="file"
                onChange={onImageChange}
                inputProps={{ accept: "image/*" }}
            />
            <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                name="title"
                label="Blog title"
                type="text"
                value={data.title}
                onChange={onChangeHandler}
            />
            <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                name="summary"
                label="Blog summary"
                type="text"
                value={data.summary}
                onChange={onChangeHandler}
            />
            <ReactQuill
                theme="snow"
                value={data.description}
                onChange={onDescriptionChange}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Blog category</InputLabel>
                <Select
                    name="category"
                    value={data.category}
                    onChange={onChangeHandler}
                    label="Blog category"
                >
                    <MenuItem value="Startup">Startup</MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: 'primary.main' }}>
                UPDATE {/* Show "Update" on the Edit page */}
            </Button>
        </Box>
    );
}
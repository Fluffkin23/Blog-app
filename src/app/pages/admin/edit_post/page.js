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
import {useFormData, useImageHandler} from "@/app/functions/upload_edit_post/postUtils";

export default function EditBlogPage()
{
    const initialState ={
        title: "",
        description: "",
        summary: "",
        category: "",
        author: "",
        authorImage: ""
    };

    const { data, handleInputChange, setData } = useFormData(initialState);
    const {image,handleImageChange, setImage, resetImage} = useImageHandler();
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
    }, [blogId, setData, setImage]);
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

    const onDescriptionChange = (value) => {
        setData(data => ({ ...data, description: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('summary', data.summary);
        formData.append('category', data.category);
        formData.append('author', name);
        formData.append('authorImage', session.user.profile_pic);
        formData.append('image', image);
        try {
            const response = await axios.put(`/api/blog?id=${blogId}`, formData);  // Send a PUT request to update the blog
            if (response.data.success)
            {
                toast.success('Blog updated successfully!');
                setData(initialState);
                setImage(null);
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
                onChange={handleImageChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
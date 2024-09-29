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
import {useFetchBlogById} from "@/app/functions/edit_blog/useFetchBlogById";
import {useForm} from "@/app/functions/edit_blog/useForm";

export default function EditBlogPage() {
    const {data:session, status} = useSession();
    const searchParams = useSearchParams();
    const blogId = searchParams.get("id");

    const { formData, image, handleChange, handleDescriptionChange, handleImageChange, setFormData, setImage } = useForm({
        title: "",
        description: "",
        summary: "",
        category: "",
        author: "",
        authorImage: ""
    });

    useFetchBlogById(blogId, setFormData, setImage);

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
                setFormData({
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
                value={formData.title}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                name="summary"
                label="Blog summary"
                type="text"
                value={formData.summary}
                onChange={handleChange}
            />
            <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Blog category</InputLabel>
                <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
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

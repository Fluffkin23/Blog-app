"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {signIn, useSession} from "next-auth/react";
import {useFormData, useImageHandler} from "@/app/functions/upload_edit_post/postUtils";




export default  function UploadPage  () {

  const initialState = {
    title: "",
    description: "",
    summary:"",
    category: "", // default category
    author: "",
    authorImage:""
  };

  const { data, handleInputChange, setData } = useFormData(initialState);
  const { image, handleImageChange } = useImageHandler();
  const {data:session, status}=useSession();

  if(status === 'loading')
  {
    return <p>Loading....</p>;
  }

  if(!session)
  {
    return <p>You need to be loggin in to view this page</p>;

  }

  const {name, profile_pic,role} = session.user;
  if(role !== 'admin')
  {
    return <p>You need to be admin in to view this page</p>;
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
    formData.append('authorImage', profile_pic);
    formData.append('image', image);

    // reset the fields from the upload page
    try {
      const response = await axios.post('/api/blog', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setData(initialState);
      }
      else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error");
    }
  };

  return (
    <Box component="form" onSubmit={onSubmitHandler} sx={{ p: 2 }}>
      <Typography variant="h6">Upload thumbnail</Typography>
      <label htmlFor='image'>
      {image ? (
          <img
            src={typeof image === 'string' ? image : URL.createObjectURL(image)} // Display the existing image or newly selected image
            alt='Upload Thumbnail'
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
        required
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
      ></ReactQuill>
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
        ADD
      </Button>
    </Box>
  );
}


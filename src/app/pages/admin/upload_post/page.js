"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {signIn, useSession} from "next-auth/react";
import {useFormData, useImageHandler, useSubmitBlog} from "@/app/functions/upload_edit_post/postUtils";
import {useAuth} from "@/app/functions/user_management/userUtils";




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
  const { image, handleImageChange, setImage } = useImageHandler();
  const {data:session, status}=useSession();
  const { isLoading, isAuthenticated, hasRequiredRole } = useAuth('admin');

  const onSubmitHandler = useSubmitBlog(initialState,setData,setImage)  // Get the custom hook function

    if (isLoading) return <p>Loading...</p>;
    if (!isAuthenticated) return <p>You need to be logged in to view this page</p>;
    if (!hasRequiredRole) return <p>You need to be an admin to view this page</p>;

  const onDescriptionChange = (value) => {
    setData(data => ({ ...data, description: value }));
  };




  return (
    <Box component="form" onSubmit={(e) => {e.preventDefault(); onSubmitHandler(data, image, session);}} sx={{ p: 2 }}>
      <Typography variant="h6">Upload thumbnail</Typography>
      <label htmlFor='image'>
      {image ? (
          <img
              src={URL.createObjectURL(image)}
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


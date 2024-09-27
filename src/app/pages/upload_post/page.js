"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography, FormHelperText } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Ensure CSS is correctly imported



const Page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    summary:"",
    category: "Startup", // default category
    author: "Costache Alin",
    authorImage: "/author_img.png",
  });

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
    formData.append('author', data.author);
    formData.append('authorImage', data.authorImage);
    formData.append('image', image);

    try {
      const response = await axios.post('/api/blog', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(null);
        setData({
          title: "",
          description: "",
          summary:"",
          category: "Startup",
          author: "Costache Alin",
          authorImage: "/author_img.png",
        });
      } else {
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
        onChange={onImageChange}
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
      ></ReactQuill>      
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
        ADD
      </Button>
    </Box>
  );
};

export default Page;

"use client";
import { useState } from "react";
import { Avatar, Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios"; // Ensure axios is installed and imported
import { toast } from "react-toastify"; // Ensure react-toastify is installed and imported

export default function Register() {
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState('');
    
    const [data, setData] = useState({
        name: "",
        email: "",
        role: "user",
        password: "",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(data => ({ ...data, [name]: value }));
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setProfilePic(file);
            setPreview(URL.createObjectURL(file)); // To display the image preview
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('role', data.role);
        formData.append('password',data.password);
        formData.append('profile_pic', profilePic);

        try {
            const response = await axios.post('/api/user', formData);
            if (response.data.success) {
                toast.success(response.data.msg);
                setProfilePic(null);
                setPreview('');
                setData({
                    name: "",
                    email: "",
                    role: "user",
                    password: "",
                });
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            toast.error(error.response?.data.message || "Error");
        }
    };

    return (
        <Container>
            <form onSubmit={onSubmitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="User Name"
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={onChangeHandler}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={onChangeHandler}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <input
                            accept="image/*"
                            type="file"
                            onChange={onImageChange}
                            style={{ display: 'none' }}
                            id="upload-button"
                        />
                        <label htmlFor="upload-button">
                            <Button component="span" fullWidth>
                                Upload Profile Picture
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {preview && <Avatar src={preview} sx={{ width: 56, height: 56 }} />}
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

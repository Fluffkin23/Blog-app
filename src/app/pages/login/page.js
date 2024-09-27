"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Calling NextAuth signIn method
        const result = await signIn('credentials', {
            redirect: false, // Prevent NextAuth from redirecting automatically
            email,
            password
        });

        if (!result.error) {
            // Redirect the user to their dashboard or home page upon successful login
            window.location.href = 'http://localhost:3000';
        } else {
            // Handle errors, e.g., show an error message
            alert(result.error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
            <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                Sign In
            </Button>
        </Box>
    );
}

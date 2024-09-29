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
        // Call NextAuth signIn method with a callbackUrl for redirection
        const result = await signIn('credentials', {
            redirect: true, // Disable automatic redirect
            email,
            password,
            callbackUrl: '/', // Redirect to the home page after login
        });

        if (!result.error) {
            // Use the provided callbackUrl from NextAuth to redirect
            window.location.href = result.url || '/'; // Fallback to home page if no URL is provided
        } else {
            // Set an error message instead of using alert
            console.log('Login failed. Please check your credentials.');
        }
    };

    return (
        <Box component="form"   onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
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

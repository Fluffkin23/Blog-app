"use client";
import React from 'react';
import { Box, Typography, Button, TextField, Container } from "@mui/material";
import Image from 'next/image';
import { assets } from '../../../../public/assets';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Footer ()
{
  return (
    <Container sx={{ py: 5 }}>
      {/* Logo and Get Started Button */}
      <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <Image src={assets.logo_icon} alt='' style={{ sm: 'auto' }}></Image>
        <Button variant="outlined" sx={{display: 'flex', alignItems: 'center', gap: 2, fontWeight: 'medium', border: '2px solid black', boxShadow: '-7px 7px 0px #000000',
            py: 2, px: { xs: 3, sm: 6 }}}>Get Started
            <ArrowForwardIcon/>
        </Button>
      </Box>

      {/* Title and Description */}
      <Box sx={{ textAlign: 'center', my: 8 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'medium', fontSize: { xs: '2rem', sm: '3rem' } }}>Latest Blogs</Typography>
        <Typography variant="body1" sx={{ mt: 3, maxWidth: '740px', mx: 'auto', fontSize: { xs: '0.75rem', sm: '1rem' } }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Box>
      
      {/* Email Subscription Form */}
      <Box component="form" sx={{display: 'flex', justifyContent: 'space-between', maxWidth: '500px', mx: 'auto', mt: 5, border: '2px solid black', boxShadow: '-7px 7px 0px #000000',
          transform: { xs: 'scale(0.75)', sm: 'scale(1)' },}}>
        <TextField type="email" placeholder="Enter your Email" variant="standard" InputProps={{ disableUnderline: true }}  sx={{ pl: 2, flex: 1 }}/>
        <Button type="submit" sx={{ borderLeft: '2px solid black', py: 2, px: { xs: 3, sm: 6 }, bgcolor: 'transparent', '&:active': { bgcolor: 'gray', color: 'white' },}}>Subscribe</Button>
      </Box>
    </Container>
  );
}

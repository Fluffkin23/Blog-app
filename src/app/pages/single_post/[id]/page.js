"use client";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";
import DOMPurify from "dompurify";
import React, { useState, useEffect } from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import Image from "next/image";
import { useRouter } from 'next/router';
import {useSession} from "next-auth/react";
import {fetchBlog} from "@/app/functions/customHooks/fetch_blog_by_id";
import {useAuthSession} from "@/app/functions/customHooks/useAuthSession";


export default function BlogPage({params})
{
  // Use the custom hook for blog data
  const { data, loading, error } = fetchBlog(params.id)
  // Use the custom hook for session
  const { session, status } = useAuthSession();

  if (status === 'loading') {
    return <p>Loading....</p>;
  }

  if (!session) {
    return <p>You need to be logged in to view this page</p>;
  }

  if (loading) {
    return <p>Loading...</p>;  // Add loading state handling
  }

  if (error) {
    return <p>Error loading blog data: {error.message}</p>;  // Add error handling
  }

  // Component to render saniitized HTML content safetly
  function SafeHtmlTypography({htmlContent})
  {
    const cleanHtml = DOMPurify.sanitize(htmlContent);
    return(
      <Typography sx={{textAlign:"justify", textIndent:'2em'}}>
        <span dangerouslySetInnerHTML={{__html:cleanHtml}}></span>
      </Typography>
    );
  }

  // Main render logic
  return data ? (
    <>
      <Box sx={{bgcolor:'grey.200', px:{xs:1, sm:3, md:12, lg:28}, py:2}}>
        <Box sx={{textAlign:'center', my:6}}>
          <Typography variant="h3" sx={{maxWidth:700, mx:`auto`, fontWeight:'bold'}}>{data.title}</Typography>
          <Avatar src={data.authorImage} sx={{mx:'auto', mt:1, border:'2px solid white', width: 56, height: 56}}></Avatar>
          <Typography sx={{mt:1}}>{data.author}</Typography>
        </Box>
      </Box>
      <Box sx={{mx:{xs:1, md:'auto'}, maxWidth:800, mt:-5, mb:2.5}}>
        <Image src={data.image} width={1280} height={720} alt={data.title || "Blog Image"} layout="responsive"/>
        <Typography variant="h4" sx={{ my: 2 }}>Introduction:</Typography>
        <SafeHtmlTypography htmlContent={data.description} />
        <Box sx={{ textAlign: 'center', my: 6 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}> Share this article on social media </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <IconButton aria-label="share on Facebook"><FacebookIcon /></IconButton>
            <IconButton aria-label="share on Twitter"><TwitterIcon /></IconButton>
            <IconButton aria-label="share on Google"><GoogleIcon /></IconButton>
          </Stack>  
        </Box>
      </Box>
    </>
  ): null;
}
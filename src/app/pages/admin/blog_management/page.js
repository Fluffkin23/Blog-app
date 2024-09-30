"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "react-toastify";
import Box from "@mui/material/Box";
import {IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useBlogs} from "@/app/functions/customHooks/useBlogs";
import {useDeleteBlog} from "@/app/functions/blog_management/useDeleteBlog";

export default function Page()
{
    const router = useRouter();
    const {blogs, loading, error, setBlogs} = useBlogs();
    const {handleDelete} = useDeleteBlog(blogs, setBlogs);

    const handleEdit = (id) =>
    {
        router.push(`/pages/admin/edit_post?id=${id}`)
    }

    if(loading)
    {
        return <Typography variant="body1">Loading...</Typography>;
    }
    if(error)
    {
        return <Typography variant="body1">{error}</Typography>;
    }

    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Manage Blogs
            </Typography>
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <Box key={blog._id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
                        <Box>
                            <Typography variant="h6">{blog.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {blog.summary}
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton onClick={() => handleEdit(blog._id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(blog._id)} sx={{ color: "red" }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                ))
            ) : (
                <Typography variant="body1">No blogs found</Typography>
            )}
        </Box>
    );
}
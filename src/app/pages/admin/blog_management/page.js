"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "react-toastify";
import Box from "@mui/material/Box";
import {IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Page()
{
    const [blogs, setBlogs] = useState([]);
    const router = useRouter();

    // Fetch all the blogs
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("/api/blog");
                console.log("API Response:", response.data);  // Log the API response for debugging
                if (response.data && response.data.blogs) {
                    setBlogs(response.data.blogs);  // Assuming 'blogs' is the key in the API response
                } else {
                    console.error("Unexpected response structure:", response.data);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);  // Log the error if there's any issue
            }
        };
        fetchBlogs();
    }, [])

    // Delete blog post by ID
    const handleDelete = async (id) => {
        try {
            console.log(`Attempting to delete blog with ID: ${id}`);  // Debugging: Log the ID being sent for deletion

            const response = await axios.delete(`/api/blog?id=${id}`);
            console.log("Delete response:", response.data);  // Debugging: Log the API response for deletion

            if (response.data.success) {
                setBlogs(blogs.filter((blog) => blog._id !== id));  // Remove the deleted blog from the list
                toast.success("Blog deleted successfully");
            } else {
                throw new Error(response.data.msg || "Delete failed");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);  // Log the error if deletion fails
            toast.error("Failed to delete the blog");
        }
    };

    const handleEdit = (id) =>
    {
        router.push(`/pages/admin/edit_blog?id=${id}`);
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
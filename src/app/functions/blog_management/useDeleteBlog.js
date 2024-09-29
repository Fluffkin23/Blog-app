import {toast} from "react-toastify";

export const useDeleteBlog = (blogs,setBlogs) =>
{
    const handleDelete = async (id) =>
    {
        try
        {
            const response = await axios.delete(`/api/blog?id=${id}`);
            if (response.data.success)
            {
                // Update UI by removing deleted blog
                setBlogs(blogs.filter((blog) => blog._id !== id));
                toast.success("Blog deleted successfully");
            }
            else
            {
                throw new Error(response.data.msg || "Delete failed");
            }
        }
        catch(error)
        {
            toast.error("Failed to delete the blog");
        }
    };
    return {handleDelete};
};
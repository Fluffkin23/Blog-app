import axios from "axios";
import {toast} from "react-toastify";

export const useSubmitBlog = (blogId, formData, image, setFormData, setImage) =>
{
    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        const formDataToSend = new FormData(formData);
        formData.append('title', formDataToSend.title);
        formData.append('description', formDataToSend.description);
        formData.append('summary', formDataToSend.summary);
        formData.append('category', formDataToSend.category);
        formData.append('author', formDataToSend.author);
        formData.append('authorImage', formDataToSend.authorImage);
        formData.append('image', formDataToSend.image);

        try
        {
            const response = await axios.put(`/api/blog?id=${blogId}`, formDataToSend);
            if(response.data.success)
            {
                toast.success(response.data.msg);
                setImage(null);
                setFormData({
                    title:"",
                    description:"",
                    summary:"",
                    category:"",
                    author:"",
                    authorImage:"",
                });
            }
            else
            {
                throw new Error('Update failed');
            }
        }
        catch (error)
        {
            toast.error(error.response?.data.message || "Error");
        }
    };
    return {handleSubmit};
}
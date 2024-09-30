import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export function useFormData(initialState)
{
    const [data, setData] = useState(initialState);

    const handleInputChange = (e) =>
    {
        const {name,value} = e.target;
        setData(data => ({ ...data, [name]: value }));
    };

    const resetData = () =>
    {
        setData(initialState);
    };

    return { data, handleInputChange, resetData, setData };
}

export function useImageHandler(initialImage = null)
{
    const [image, setImage] = useState(initialImage);

    const handleImageChange = (e) =>
    {
        if(e.target.files && e.target.files[0])
        {
            setImage(e.target.files[0]); // Store the file directly
        }
    };

    const resetImage = () =>
    {
        setImage(null)
    }

    return { image, setImage,handleImageChange, resetImage };
}

export function useSubmitBlog(initialState, setData, setImage) {
    const onSubmitHandler = async (data, image, session) => {
        const formData = new FormData();
        const { name, profile_pic } = session.user;

        // Append all the data fields
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('summary', data.summary);
        formData.append('category', data.category);
        formData.append('author', name);
        formData.append('authorImage', profile_pic);
        formData.append('image', image);

        try {
            const response = await axios.post('/api/blog', formData);
            if (response.data.success) {
                toast.success(response.data.msg);
                setData(initialState);  // Reset the form data
                setImage(null);         // Reset the image
            } else {
                throw new Error(response.data.msg || 'Submission failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error during submission');
        }
    };

    return onSubmitHandler;
}

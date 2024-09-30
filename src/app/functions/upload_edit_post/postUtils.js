import {useState} from "react";

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
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const resetImage = () =>
    {
        setImage(null)
    }

    return { image, setImage,handleImageChange, resetImage };
}
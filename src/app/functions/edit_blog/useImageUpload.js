import {useState} from "react";

export const useImageUpload = (initialImage) =>
{
    const [image, setImage] = useState(initialImage || null);
    const handleImageChange = (event) =>
    {
        if(event.target.files && event.target.files[0])
        {
            setImage(event.target.files[0]);
        }
    };
    return {image,handleImageChange,setImage};
}
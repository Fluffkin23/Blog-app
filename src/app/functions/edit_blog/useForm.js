import {useState} from "react";

export const useForm = (initialState ={}) =>
{
    const [formData, setFormData] = useState(initialState);
    const [image, setImage] = useState(null);

    const handleChange = (event) =>
    {
        const {name, value} = event.target;
        setFormData((data) => ({...data, [name]: value}));
    };

    const handleDescriptionChange = (value) =>
    {
        setFormData((data) => ({ ...data, description: value }));
    };

    const handleImageChange = (event) =>
    {
        const files = event?.target?.files;
       if(files && files[0])
       {
           setImage(files[0]);
       }
    };
    return {formData, image, handleChange, handleDescriptionChange, handleImageChange,setFormData, setImage};
}
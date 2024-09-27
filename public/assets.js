import blog_pic_1 from './images/blog_pic_1.png'
import blog_pic_2 from './images/blog_pic_2.png';
import blog_pic_3 from './images/blog_pic_3.png';
import logo_icon from "./images/logo.png";
import profile_icon from "./images/profile_icon.png";


export const assets = {
    profile_icon,
    logo_icon,
    }



export const blog_data = [{
    id:1,
    title:"A detailed step by step guide to manage your lifestyle",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    image:blog_pic_1,
    date:Date.now(),
    category:"Lifestyle",
    author:"Alex Bennett",
    author_img:profile_icon
},
{
    id:2,
    title:"How to create an effective startup roadmap or ideas",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image:blog_pic_2,
    date:Date.now(),
    category:"Startup",
    author:"Alex Bennett",
    author_img:profile_icon
},
{
    id:3,
    title:"Learning new technology to boost your career in software",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image:blog_pic_3,
    date:Date.now(),
    category:"Technology",
    author:"Alex Bennett",
    author_img:profile_icon
},
]
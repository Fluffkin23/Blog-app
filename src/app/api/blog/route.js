import { z } from "zod";
import { ConnectDB } from "../../../../lib/config/db";
import BlogModel from "../../../../lib/config/models/BlogModel";
import {writeFile} from 'fs/promises'

// Define a schema for the blog post using Zod
const BlogSchema = z.object({
    title: z.string(),
    description: z.string(),
    summary:z.string(),
    category: z.string(),
    author: z.string(),
    authorImage: z.string(),
    image: z.string(), // Assuming image URL needs to be valid
});

const { NextResponse } = require("next/server")

const LoadDB = async () => 
{
   await ConnectDB(); 
}

LoadDB();

export async function GET(request)
{
    // it will find all the blogs from this blogmodel
    const blogs = await BlogModel.find({});

    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) 
    {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    }
    else
    {
        console.log("Blog GET Hit")
        return NextResponse.json({blogs})
    }
}


//API EDNPOIT TO SEND/POST BLOGS
export async function POST(request)
{
    const formData = await request.formData();

    // Construct the blog data object from the form data
    const blogData = {
        title: formData.get('title'),
        description: formData.get('description'),
        summary: formData.get('summary'),
        category: formData.get('category'),
        author: formData.get('author'),
        image: `/${Date.now()}_${formData.get('image').name}`,
        authorImage: formData.get('authorImage'),
    };

    // Validate the blog data against the schema
    try {
        // This will throw if any field is invalid
        BlogSchema.parse(blogData);
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Invalid blog data", error: error.message });
    }

    // If validation is successful, proceed with file handling and database insertion
    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${blogData.image}`;
    await writeFile(path, buffer);
    
    await BlogModel.create(blogData);
    console.log("Blog Saved");

    return NextResponse.json({ success: true, msg: "Blog Added" });
}

//DELETE API
export async function DELETE(request){
    const url = new URL(request.url);
    const blogId = url.searchParams.get("id");
    console.log("Delete request for blog ID:", blogId);  // Log the ID

    if (!blogId) {
        console.log("Blog ID missing");
        return NextResponse.json({ success: false, msg: "Blog ID is required" }, { status: 400 });
    }

    try {
        const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
        if (!deletedBlog) {
            console.log("Blog not found");
            return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
        }
        console.log("Blog deleted successfully");
        return NextResponse.json({ success: true, msg: "Blog deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ success: false, msg: "Failed to delete blog", error: error.message }, { status: 500 });
    }
}

// PUT API to update blog
export async function PUT(request)
{
    const url = new URL(request.url);
    const blogId = url.searchParams.get("id");

    if (!blogId) {
        return new Response(JSON.stringify({ success: false, msg: "Blog ID is required" }), { status: 400 });
    }

    try {
        const formData = await request.formData();
        const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, {
            title: formData.get('title'),
            description: formData.get('description'),
            summary: formData.get('summary'),
            category: formData.get('category'),
            image: formData.get('image'), // If updating the image
            author: formData.get('author'),
            authorImage: formData.get('authorImage'),
        }, { new: true });

        if (!updatedBlog) {
            return new Response(JSON.stringify({ success: false, msg: "Blog not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, msg: "Blog updated" }), { status: 200 });
    } catch (error) {
        console.error("Error updating blog:", error);
        return new Response(JSON.stringify({ success: false, msg: "Failed to update blog", error: error.message }), { status: 500 });
    }
}
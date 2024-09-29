import { z } from "zod";
import { ConnectDB } from "../../../../lib/config/db";
import UserModel from "../../../../lib/config/models/UserModel";
import {writeFile} from 'fs/promises'
import { NextResponse } from "next/server";
import { argon2d } from "argon2";

const UserSchema = z.object({
    name:z.string(),
    email:z.string(),
    password:z.string(),
    role:z.string(),
    profile_pic:z.string(),
});

const LoadDB = async () => 
    {
       await ConnectDB(); 
    }
    
LoadDB();

export async function GET(request)
{
    // it will find all the blogs from this blogmodel
    const userData = await UserModel.find({});

    const userId = request.nextUrl.searchParams.get("id");
    if (userId) 
    {
        const user = await UserModel.findById(userId);
        return NextResponse.json(user);
    }
    else
    {
        console.log("User GET Hit")
        return NextResponse.json({userData})
    }
}

export  async function POST(request) {

    const formData = await request.formData();

    // Construct the blog data object from the form data
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: formData.get('role'),
        profile_pic: `/${Date.now()}_${formData.get('profile_pic').name}`,
    };

    // Validate the blog data against the schema
    try {
        // This will throw if any field is invalid
        UserSchema.parse(userData);
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Invalid user data", error: error.message });
    }

    // If validation is successful, proceed with file handling and database insertion
    const profile_pic = formData.get('profile_pic');
    const imageByteData = await profile_pic.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${userData.profile_pic}`;
    await writeFile(path, buffer);
    
    await UserModel.create(userData);
    console.log("User Saved");

    return NextResponse.json({ success: true, msg: "User Added" });
}

// Delete user (DELETE)
export async function DELETE(request)
{
    const userId = request.nextUrl.searchParams.get("id");  // Extract user ID from the query parameters

    if (!userId) {
        return NextResponse.json({ success: false, msg: "User ID is required" }, { status: 400 });
    }

    try {
        const deletedUser = await UserModel.findByIdAndDelete(userId);  // Delete the user by ID
        if (!deletedUser) {
            return NextResponse.json({ success: false, msg: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, msg: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ success: false, msg: "Failed to delete user", error: error.message }, { status: 500 });
    }
}

// Update User Role(PATCH)
export async function PATCH(request)
{
    const userId = request.nextUrl.searchParams.get("id");
    const { role } = await request.json(); // Expect the new role in the request body

    if (!userId) {
        return NextResponse.json({ success: false, msg: "User ID is required" }, { status: 400 });
    }

    try
    {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { role }, { new: true });
        if (!updatedUser) {
            return NextResponse.json({ success: false, msg: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, msg: "User role updated", updatedUser });
    } catch (error) {
        console.error("Error updating user role:", error);
        return NextResponse.json({ success: false, msg: "Failed to update user", error: error.message }, { status: 500 });
    }
}

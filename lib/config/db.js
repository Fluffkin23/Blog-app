import mongoose from "mongoose";

export const ConnectDB = async() => {
    await mongoose.connect('mongodb+srv://fluffkin23:parola@cluster0.s9avq.mongodb.net/blogg-app');
    console.log("DB connected");
}
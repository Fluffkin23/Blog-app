import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectDB } from "../../../../../lib/config/db";
import UserModel from "../../../../../lib/config/models/UserModel";

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await ConnectDB();
          const user = await UserModel.findOne({
            email: credentials.email,
            password: credentials.password // This should ideally be a hashed comparison
          }).exec();

          if (user) {
            return { id: user._id, name: user.email, role: user.role };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Database operation failed");
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  }
};

export const GET = async (req, res) => NextAuth(req, res, options);
export const POST = async (req, res) => NextAuth(req, res, options);

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectDB } from "../../../../../lib/config/db";
import UserModel from "../../../../../lib/config/models/UserModel";

console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);

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
            return { id: user._id, name: user.email, role: user.role, profile_pic: user.profile_pic, password: user.password };
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
    signIn: '/pages/login',
    error: '/auth/error'
  },
  callbacks:{
    async jwt({token, user})
    {
      if(user)
      {
        token.email = user.email;
        token.name = user.name;
        token.profile_pic = user.profile_pic;
        token.password = user.password;
        token.role = user.role;
      }
      return token;
    },
    async session({session,token})
    {
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.role = token.role;
      session.user.password = token.password;
      session.user.profile_pic = token.profile_pic;

      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET

};

export const GET = async (req, res) => NextAuth(req, res, options);
export const POST = async (req, res) => NextAuth(req, res, options);

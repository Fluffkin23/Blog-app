"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/layout/Header";
import BlogList from "./components/ui/BlogList";
import Footer from "./components/layout/Footer";
import {getSession, signIn, useSession} from "next-auth/react";

import HomePage from "@/app/pages/homepage/page";
import {usePathname} from "next/navigation";
import {useEffect} from "react";


export default function Home() {

    const { data: session, status } = useSession();

    const loading = status === "loading";
    const pathname = usePathname(); // Get current pathname
    console.log(pathname);


    useEffect(() => {
        if (!loading && !session && pathname !== '/pages/login') {
            signIn(); // Redirect to sign-in if user is not logged in
        }
    }, [loading, session, pathname]);

    if (loading) return <p>Loading...</p>;

    if (!session) return null;



  return (
    <div>
      <Header></Header>
      <HomePage></HomePage>
      <Footer></Footer>
    </div>
  );
}

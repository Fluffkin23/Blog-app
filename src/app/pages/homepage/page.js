
import {signIn, useSession} from "next-auth/react";
import {usePathname} from "next/navigation";
import {useEffect} from "react";
import Header from "@/app/components/layout/Header";
import BlogList from "@/app/components/ui/BlogList";
import Footer from "@/app/components/layout/Footer";

export default function HomePage() {

    const { data: session, status } = useSession();


    return (
        <div>
            <BlogList></BlogList>
        </div>
    );
}
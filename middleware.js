

// Secret JWT Token
import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req)
{
    // get the session token from the request header
    const token = await getToken({req, secret});
    // get the pathname of the request
    const {pathname}  = req.nextUrl;


    if (pathname === '/') {
        return NextResponse.redirect(new URL('/pages/homepage', req.url));
    }

    if(pathname.startsWith('/api/auth') || pathname === '/pages/homepage' || pathname === '/pages/settings' || pathname === '/pages/admin/upload_post')
    {
        return NextResponse.next();
    }

    // if no token , redirect to the login page
    if(!token)
    {
        return NextResponse.redirect(new URL('/login',req.url));
    }

    //Redirect non-admin trying to access admin-only pages
    const userRole = token?.role;
    if (pathname.startsWith('/admin') && userRole !== 'admin')
    {
        return NextResponse.redirect(new URL('/pages/login', req.url));
    }

    // Allow the request if the user is admin
    return NextResponse.next();

}

export const config =
{
    matcher:['/pages/settings', '/pages/homepage', '/pages/single_post','/admin/:path*'],
};

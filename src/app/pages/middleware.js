

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Perform your checks here. For example, let's say you want to check if the user is authenticated
    if (pathname.startsWith('/protected')) {
        const token = request.cookies.get('token');

        if (!token) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL('/pages/login', request.url));
        }
    }

    return NextResponse.next();
}
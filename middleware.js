import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request) {
  const url = request.nextUrl.pathname;

  // Allow access to these routes without authentication
  if (url === '/' || url === '/forgot-password' || url === '/reset-password') {
    return NextResponse.next();
  }

  // Update user's auth session
  const response = await updateSession(request);

  // Check if the user is authenticated
  const user = response.cookies.get('sb:token');

  // Redirect to home if not authenticated and trying to access protected routes
  if (!user && (url.startsWith('/orders') || url.startsWith('/pictures'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
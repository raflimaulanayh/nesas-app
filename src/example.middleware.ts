// import { getToken } from 'next-auth/jwt'
// import { withAuth } from 'next-auth/middleware'
// import { NextRequest, NextResponse } from 'next/server'

// export default withAuth(
//   async function middleware(request: NextRequest) {
//     const requestHeaders = new Headers(request.headers)
//     const token = await getToken({ req: request })
//     const { pathname } = request.nextUrl
//     const role = (token?.user?.role || '').toLowerCase() // Prevents TypeError if token.user.role is undefined

//     // Define allowed routes for each role
//     const allowedRoutes = {
//       admin: ['/dashboard'],
//       student: ['/student'],
//       teacher: ['/teacher']
//     }

//     // Get allowed routes for the user's role
//     const userAllowedRoutes = allowedRoutes[role as keyof typeof allowedRoutes] || []

//     // If the requested pathname is not in the user's allowed routes, redirect accordingly
//     if (role) {
//       if (!userAllowedRoutes.some((route) => pathname.startsWith(route))) {
//         // Redirect based on role
//         if (role === 'admin') {
//           return NextResponse.redirect(new URL('/dashboard', request.url))
//         } else if (role === 'student') {
//           return NextResponse.redirect(new URL('/student', request.url))
//         } else if (role === 'teacher') {
//           return NextResponse.redirect(new URL('/teacher', request.url))
//         }
//       }
//     }

//     requestHeaders.set('x-pathname', request.nextUrl.pathname)

//     return NextResponse.next({
//       request: {
//         headers: requestHeaders
//       }
//     })
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         if (token) {
//           return true
//         }

//         return false
//       }
//     },
//     pages: {
//       signIn: '/login'
//     }
//   }
// )

// export const config = {
//   matcher: ['/cdashboard/:path*', '/student/:path*', '/teacher/:path*']
// }

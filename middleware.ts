"use server"
import { NextResponse } from "next/server"; 
import { clerkMiddleware, createRouteMatcher, currentUser } from '@clerk/nextjs/server'
import { db } from "./lib/prisma";



const isProtectedRoute = createRouteMatcher(['/user(.*)','/dashboard(.*)'])
const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])
const isAdminRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const {userId} = await auth()



 
 
  const loginUrl = new URL("/sign-in", req.url); 
  const rootUrl = new URL("/", req.url); 
  if (isProtectedRoute(req)){
    if (!userId) {
      return NextResponse.redirect(loginUrl); 
    }
  }

  if (isAuthRoute(req)) {
    if (userId) {
      return NextResponse.redirect(rootUrl); 
    }
  }



  

  

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/api/(.*)', 
  ],
};
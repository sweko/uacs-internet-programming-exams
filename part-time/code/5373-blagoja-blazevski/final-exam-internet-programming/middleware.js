import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();

  if (url.pathname === '/') {
    url.pathname = '/Recipes';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: '/',
};
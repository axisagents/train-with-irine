import { rewrite, next } from '@vercel/edge';

// Only run on the root path; assets, /mobile.html and /index.html are untouched.
export const config = { matcher: '/' };

const PHONE = /Mobile|iPhone|iPod|Android.*Mobile|BlackBerry|IEMobile|Opera Mini|Windows Phone/;

export default function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  if (PHONE.test(ua)) {
    return rewrite(new URL('/mobile.html', request.url));
  }
  return next();
}

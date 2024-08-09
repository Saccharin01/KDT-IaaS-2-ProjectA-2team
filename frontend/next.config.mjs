/** @type {import('next').NextConfig} */
import dotenv from 'dotenv'
import path from 'path';
dotenv.config({
  path: path.resolve(process.cwd(), '../.env')
})

const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_PROXY_SERVICE_HOST: process.env.PROXY_SERVICE_HOST,
    SEARCH_ROUTER: process.env.SEARCH_ROUTER,
    AUTH_SIGNUP_ROUTER: process.env.AUTH_SIGNUP_ROUTER,
    AUTH_LOGIN_ROUTER: process.env.AUTH_LOGIN_ROUTER
  },
};

export default nextConfig;

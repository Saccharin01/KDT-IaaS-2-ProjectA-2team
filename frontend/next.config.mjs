/** @type {import('next').NextConfig} */
import dotenv from 'dotenv'
import path from 'path';
dotenv.config({
  path: path.resolve(process.cwd(), '../.env')
})

const nextConfig = {
  env: {
    NEXT_PUBLIC_PROXY_SERVICE_HOST: process.env.PROXY_SERVICE_HOST
  },
};

export default nextConfig;

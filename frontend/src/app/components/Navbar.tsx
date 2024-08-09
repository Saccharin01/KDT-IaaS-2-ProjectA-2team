'use client'

import Link from "next/link";
import SearchBar from "./SearchBar";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Navbar() {
  
  const path = usePathname()
  const [isView, setIsView] = useState<boolean>();

  useEffect(() => {
    if(path === '/')
      setIsView(false);
    else
      setIsView(true);
  }, [path])

  return (
    <nav>
      <div className="w-screen fixed z-50 bg-white">
        <div className="flex justify-between h-16 px-10 shadow items-cente">
          <div className="flex items-center space-x-1">
            <h1 className="text-xl lg:text-2xl font-bold cursor-pointer mr-3">
              CyberFunc
            </h1>
            <div className="hidden lg:flex justify-around space-x-4 gap-10">
              <Link
                href="/"
                className="hover:text-indigo-600 text-gray-700 pl-10"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="hover:text-indigo-600 text-gray-700"
              >
                About
              </Link>
              <Link
                href="/service"
                className="hover:text-indigo-600 text-gray-700"
              >
                Service
              </Link>
              <Link
                href="/contact"
                className="hover:text-indigo-600 text-gray-700"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            { isView && <SearchBar /> }
          </div>
          <div className="flex space-x-4 items-center">
            <Link href="/login" className="text-gray-800 text-sm">
              LOGIN
            </Link>
            <Link
              href="/signup"
              className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm"
            >
              SIGNUP
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

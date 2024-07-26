'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { PhotoIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Sidebar = ({ children }) => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('shoppingBag');

  useEffect(() => {
    // Update activeItem based on the current pathname
    if (router.pathname === '/orders') {
      setActiveItem('shoppingBag');
    } else if (router.pathname === '/pictures') {
      setActiveItem('picture');
    }
  }, [router.pathname]);
  
  return (
    <div>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-18 h-screen transition-transform -translate-x-full sm:translate-x-0 flex flex-col justify-between items-center"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="relative p-2">
            <Image src="/images/avatar.png" width={40} height={40} alt="Avatar" className="w-10 h-10 rounded-full" />
            <span className="w-5 h-5 text-white bottom-0 left-8 absolute">
              <Image src='/images/verifiqued-icon.png' width={15} height={15} alt='Verificado' />
            </span>
          </div>
          <ul className="space-y-2 font-medium mt-4">
            <li className={`${activeItem === 'shoppingBag' ? 'border-l-4 border-[#E3026F] rounded pl-[.3rem]' : 'pl-2'}`}>
              <Link
                href="/orders"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setActiveItem('shoppingBag')}
              >
                <ShoppingBagIcon className={`w-6 h-6 ${activeItem === 'shoppingBag' ? 'text-[#E3026F]' : 'text-gray-500'} hover:text-[#E3026F]`} />
              </Link>
            </li>
            <li className={`${activeItem === 'picture' ? 'border-l-4 border-[#E3026F] rounded pl-[.3rem]' : 'pl-2'}`}>
              <Link
                href="/pictures"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setActiveItem('picture')}
              >
                <PhotoIcon className={`w-6 h-6 ${activeItem === 'picture' ? 'text-[#E3026F]' : 'text-gray-500'} hover:text-[#E3026F]`} />
              </Link>
            </li>
          </ul>
        </div>
        <div className='p-2'>
          <Link
            href="/"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Image src='/images/log-out.png' alt='Log Out' width={20} height={20} className='w-6 h-6' />
          </Link>
        </div>
      </aside>

      <div className="p-5 sm:ml-16">
        {children}
      </div>
    </div>
  )
}
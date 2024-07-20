'use client'
import React, { useState } from "react";
import Image from "next/image";
import LogIn from "@/components/LogIn";
import Register from "@/components/Register";

export default function Home() {
  const [loginTab, setLoginTab] = useState(true);

  const handleLogin = () => {
    setLoginTab(true);
  };

  const handleRegister = () => {
    setLoginTab(false);
  };

  return (
    <main className="flex">
      <div className={`transition-all ease-in-out duration-500 ${loginTab ? 'flex-initial lg:w-2/4 w-full h-screen p-8' : 'w-full h-screen p-8'}`} >
        <div className="text-sm font-medium text-center text-gray-500 w-full">
          <ul className={`flex flex-wrap ${loginTab ? 'lg:justify-around justify-between' : 'justify-between'}`}>
            <li className="me-2">
              <button className={loginTab ? 'text-3xl font-bold inline-block p-4 text-black border-b-4 border-black rounded-t-lg' : 'text-3xl font-bold inline-block p-4 border-b-2 border-transparent rounded-t-lg'} onClick={handleLogin}>Login</button>
            </li>
            <li className="me-2">
              <button className={!loginTab ? 'text-3xl font-bold inline-block p-4 text-black border-b-4 border-black rounded-t-lg' : 'text-3xl font-bold inline-block p-4 border-b-2 border-transparent rounded-t-lg'} onClick={handleRegister}>Register</button>
            </li>
          </ul>
        </div>
        <div className="h-[90%]">
          {loginTab && <LogIn />}
          {!loginTab && <Register setLoginTab={setLoginTab} />}
        </div>
      </div>
      <div className={`transition-all ease-in-out duration-500 ${loginTab ? 'flex-initial w-2/4 h-screen bg-[#f6f6f6] pb-24 lg:inline-block hidden shadow-inner' : 'hidden'}`}>
        <Image src='/images/background-logo.png' alt="background" width={1000} height={1000} className={loginTab ? 'object-contain w-full h-full' : 'hidden'} />
      </div>
    </main>
  );
}
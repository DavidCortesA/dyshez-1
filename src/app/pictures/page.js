'use client'
import React from "react";

import { Sidebar } from "@/components/Sidebar";

export default function Pictures(){
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Sidebar>
        <h1 className='font-bold text-3xl'>Pictures</h1>
      </Sidebar>
    </main>
  )
}
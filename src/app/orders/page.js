import React from 'react'

import './orders.css'

import { Sidebar } from '@/components/Sidebar'
import { TableOrders } from '@/components/TableOrders'

export const metadata = {
  title: "Dyshez | Nivel 1 | Orders",
  description: "Prueba Nivel 1 para Dyshez",
};


export default function Orders () {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Sidebar>
        <h1 className='font-bold text-3xl'>Orders</h1>
        <TableOrders />
      </Sidebar>
    </main>
  )
}
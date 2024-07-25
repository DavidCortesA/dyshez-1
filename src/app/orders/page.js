'use client'
import React, { useState, useEffect } from 'react'

import './orders.css'

import { Sidebar } from '@/components/Sidebar'
import { TableOrders } from '@/components/TableOrders'

import { getOrders } from '@/utils/actions'

export default function Orders () {
  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchData = async ()=>{
      const orders = await getOrders();
      setData(orders);
    }
    fetchData();
  },[])

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Sidebar>
        <h1 className='font-bold text-3xl'>Orders</h1>
        <TableOrders orders={data}/>
      </Sidebar>
    </main>
  )
}
import { Sidebar } from '@/components/Sidebar'
import './orders.css'
import { TableOrders } from '@/components/TableOrders'

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
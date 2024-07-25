/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import { getOrders } from '@/utils/actions';

export const TableOrders = () => {
  const [data, setData] = useState([]); 
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filter, setFilter] = useState('all');

  useEffect(()=>{
    const fetchData = async ()=>{
      const orders = await getOrders();
      setData(orders);
    }
    fetchData();
  },[])

  useEffect(() => {
    if (sortConfig.key) {
      const sortedData = [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setData(sortedData);
    }
  }, [sortConfig]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = data.filter(item => filter === 'all' || item.status === filter);
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Count statuses
  const acceptedCount = data.filter(order => order.status === 'Accepted').length;
  const rejectedCount = data.filter(order => order.status === 'Rejected').length;

  //Formate Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true }; 
    return time.toLocaleTimeString('en-US', options);
  }

  return (
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mt-5">
      <div className="flex justify-start gap-4 items-center bg-white px-6 py-4 border-b dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Number of orders</h2>
        <Button 
          type='button' 
          onClick={() => setFilter('all')} 
          className={`border ${filter === 'all' ? 'border-[#E3026F] text-[#E3026F] font-semibold' : 'border-gray-500 text-gray-500'} p-0 bg-transparent rounded-full min-w-12`}
        >
          All
        </Button>
        <Button 
          type='button' 
          onClick={() => setFilter('Accepted')} 
          className={`border ${filter === 'Accepted' ? 'border-[#E3026F] text-[#E3026F] font-semibold' : 'border-gray-500 text-gray-500'} py-1 px-3 bg-transparent rounded-full`}
        >
          Accepted ({acceptedCount})
        </Button>
        <Button 
          type='button' 
          onClick={() => setFilter('Rejected')} 
          className={`border ${filter === 'Rejected' ? 'border-[#E3026F] text-[#E3026F] font-semibold' : 'border-gray-500 text-gray-500'} py-1 px-3 bg-transparent rounded-full`}
        >
          Rejected ({rejectedCount})
        </Button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-400 border-b-2">
          <tr>
            {['orderId', 'customer', 'date', 'time', 'mode', 'total', 'Payment Method'].map((key) => (
              <th scope="col" className="px-6 py-3" key={key}>
                <div className="flex items-center">
                  <button onClick={() => handleSort(key)}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortConfig.key === key && (
                      sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'
                    )}
                  </button>
                </div>
              </th>
            ))}
            <th scope="col" className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((order) => (
            <tr key={order.orderId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 py-4">
              <td className="px-6 py-4">#{order.id}</td>
              <td className="px-6 py-4">{order.customer}</td>
              <td className="px-6 py-4">{formatDate(order.created_at)}</td>
              <td className="px-6 py-4">{formatTime(order.created_at)}</td>
              <td className="px-6 py-4">{order.mode}</td>
              <td className="px-6 py-4">${order.total.toFixed(2)}</td>
              <td className="px-6 py-4">{order.paymentMethod}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-5 py-1 font-normal leading-tight ${
                    order.status === 'Accepted' ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'
                  } rounded-full`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center space-x-2 justify-center py-3">
        <button
          className="px-1 py-1 bg-transparent text-black rounded-full dark:bg-gray-700 dark:text-gray-300"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 ${currentPage === index + 1 ? 'bg-transparent border border-[#E3026F] text-[#E3026F]' : 'bg-transparent text-gray-700'} dark:bg-gray-700 dark:text-gray-300 rounded-full`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-1 py-1 bg-transparent text-black rounded-full dark:bg-gray-700 dark:text-gray-300"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>  
    </div>
  );
};
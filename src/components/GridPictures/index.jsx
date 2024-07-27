'use client'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { postPicture, getPictures, deletePicture } from '@/utils/actions'

export const GridPictures = ({ selectedFiles, setSelectedFiles, setPreviewFile }) => {

  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchPictures = async () => {
      const data = await getPictures();
      setPictures(data);
    };
    fetchPictures();
  }, []);

  // In your React component
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));

    const uploadedFiles = await Promise.all(
      imageFiles.map(async (file) => {
        if (!(file instanceof File)) {
          throw new Error('Invalid file object');
        }
        const url = await postPicture({ name: file.name, type: file.type, size: file.size }); // Extract properties
        return { name: file.name, url };
      })
    );    

    setSelectedFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };



  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleDeleteImage = async (fileName) => {
    try {
      const success = await deletePicture(fileName);
      if (success) {
        console.log('Image deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleSelectFile = (file) => {
    setPreviewFile(file);
  };

  return (
    <div className="flex flex-row gap-4 flex-wrap justify-start items-start w-7/12 mt-6">
      <div className="flex flex-row gap-4 flex-wrap justify-start items-start"> 
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <Button
          onClick={handleButtonClick}
          className='w-32 h-32 border-2 border-gray-400 rounded flex justify-center items-center bg-white'
        >
          <PlusIcon className='w-6 h-6 text-gray-500'/>
        </Button>
        {selectedFiles && selectedFiles.map((file, index) => (
          <div key={index} className="relative w-32 h-32 shadow-xl border-2 rounded group hover:border-[#E3026F]" onClick={() => handleSelectFile(file)}>
            <div className='w-10 h-10 text-red-500 cursor-pointer absolute inset-10 flex items-center justify-center hidden group-hover:block transition-opacity duration-300 bg-white rounded flex justify-center items-center p-1.5 border border-black'>
              <TrashIcon 
                className="w-6 h-6 text-black" 
                onClick={() => handleDeleteImage(index)} 
              />
            </div>
            <Image src={`https://ynodavbxiqjzghylygyn.supabase.co/storage/v1/object/public/pictures/${file.name}`} alt={file.name} width={500} height={100} className="w-full h-full object-cover cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  )
}
'use client'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { postPicture, getPictures, deletePicture } from '@/utils/actions'
import { Toaster, toast } from 'react-hot-toast';

export const GridPictures = ({ selectedFiles, setSelectedFiles, setPreviewFile }) => {

  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchPictures = async () => {
      const data = await getPictures();
      setPictures(data);
    };
    fetchPictures();
  }, []);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
  
    const uploadedFiles = await Promise.all(
      imageFiles.map(async (file) => {
        const base64Data = await convertFileToBase64(file); 
        const url = await postPicture({ name: file.name, base64Data });
        toast.success(`${file.name} cargada correctamente`);
        return { name: file.name, url };
      })
    );
  
    setSelectedFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    setPictures((prevPictures) => [...prevPictures, ...uploadedFiles]);
  };
  
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };


  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleDeleteImage = async (fileName) => {
    try {
      const success = await deletePicture(fileName);
      if (success) {
        toast.success(`${fileName} eliminada correctamente`);
        setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
        setPreviewFile(null)
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
      <Toaster position="top-right" reverseOrder={false} />
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
          <div key={index} className="relative w-32 h-32 shadow-xl border-2 rounded group hover:border-[#E3026F]">
            <div className='w-10 h-10 text-red-500 cursor-pointer absolute inset-10 flex items-center justify-center hidden group-hover:block transition-opacity duration-300 bg-white rounded flex justify-center items-center p-1.5 border border-black'>
              <TrashIcon 
                className="w-6 h-6 text-black" 
                onClick={() => handleDeleteImage(file.name)} 
              />
            </div>
            <div className='w-[7.75rem] h-[7.75rem]' onClick={() => handleSelectFile(file)}>
              <Image src={`https://ynodavbxiqjzghylygyn.supabase.co/storage/v1/object/public/pictures/${file.name}`} alt={file.name} width={500} height={100} className="w-full h-full object-cover cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
'use client'

import React, { useEffect, useState } from 'react';

import './pictures.css';

import { Sidebar } from "@/components/Sidebar";
import { GridPictures } from "@/components/GridPictures";
import PreviewPictures from '@/components/PreviewPictures';

import { getPictures } from '@/utils/actions';

export default function Pictures(){
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);

  useEffect(() => {
    const fetchPictures = async () => {
      const picturesList = await getPictures();
      setSelectedFiles(picturesList);
    };

    fetchPictures();
  }, []);

  return (
    <main className="flex h-screen flex-col bg-white">
      <Sidebar>
        <h1 className='font-bold text-3xl w-full'>Pictures</h1>
        <div className='w-full h-[90%] flex flex-row'>
          <GridPictures setSelectedFiles={setSelectedFiles} setPreviewFile={setPreviewFile} selectedFiles={selectedFiles} />
          <PreviewPictures previewFile={previewFile}/>
        </div>
      </Sidebar>
    </main>
  )
}
import Image from 'next/image'
import React from 'react'

const PreviewPictures = ({ previewFile }) => {

  return (
    <div className='h-full bg-[#F4F4F4] rounded mt-6 w-5/12 flex justify-center items-center flex-col gap-4'>
      {previewFile &&      
        <div className='flex flex-col gap-4 justify-center items-center'>
          <h1 className='text-lg font-semibold uppercase'>Preview 1:1</h1>
          <div className='relative w-28 h-28 shadow-lg'>
            <Image
              src={`https://ynodavbxiqjzghylygyn.supabase.co/storage/v1/object/public/pictures/${previewFile.name}`}
              alt="Preview 1:1"
              layout="fill"
              objectFit="cover"
              className='rounded'
            />
          </div>

          {/* Preview 16:9 */}
          <h1 className='text-lg font-semibold uppercase'>Preview 16:9</h1>
          <div className='relative w-52 h-28 shadow-lg'>
            <Image
              src={`https://ynodavbxiqjzghylygyn.supabase.co/storage/v1/object/public/pictures/${previewFile.name}`}
              alt="Preview 16:9"
              layout="fill"
              objectFit="cover"
              className='rounded'
            />
          </div>
          {/* Preview 9:16 */}
          <h1 className='text-lg font-semibold uppercase'>Preview 9:16</h1>
          <div className='relative w-28 h-48 shadow-lg'>
            <Image
              src={`https://ynodavbxiqjzghylygyn.supabase.co/storage/v1/object/public/pictures/${previewFile.name}`}
              alt="Preview 9:16"
              layout="fill"
              objectFit="cover"
              className='rounded'
            />
          </div>
        </div>
      }
    </div>
  );
};

export default PreviewPictures;

import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { AtSymbolIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Toaster, toast } from 'react-hot-toast';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === 'admin' && password === 'admin') {
      toast.success('Inicio de sesión exitoso');
      router.push('/orders');
    } else {
      toast.error('Credenciales incorrectas');
    }
  }

  return (   
    <div className='my-8 flex flex-col items-center justify-between w-full h-full'>
      <Toaster position="top-right" reverseOrder={false} />
      <p className='text-center md:text-2xl text-lg font-normal lg:w-4/5 w-full mx-auto'>Ingresa con tu correo electrónico o tu número de teléfono</p>
      <form className='w-full lg:w-4/5 flex flex-col items-center justify-between gap-5'>
        <Input
          type='email'
          placeholder='Correo o teléfono'
          className='bg-transparent'
          size='lg'
          radius='full'
          variant='bordered'
          startContent={
            <AtSymbolIcon className='h-6 w-6 text-gray-500' />
          }
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Contraseña'
          className='bg-transparent'
          size='lg'
          radius='full'
          variant='bordered'
          startContent={
            <LockClosedIcon className='h-6 w-6 text-gray-500' />
          }
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <Button radius='full' variant='solid' size='lg' className='mt-8 bg-[#E3026F] text-white text-lg font-normal' type='button' onClick={handleLogin} >Continuar <ArrowRightIcon className='h-5 w-5 text-white font-bold' /></Button>
        <Link href='/forgot-password' className='text-center text-sm text-gray-500 font-normal lg:w-4/5 w-full mx-auto'>¿Cambiaste de telefono?</Link>
      </form>
      <div className='flex gap-5 mb-8'>
        <Button radius='full' variant='solid' className='bg-[#F4F4F4] px-14 py-8'><Image src='/images/icons/apple-logo.png' alt='apple' width={25} height={25}/></Button>
        <Button radius='full' variant='solid' className='bg-[#F4F4F4] px-14 py-8'><Image src='/images/icons/google-icon.webp' alt='apple' width={25} height={25}/></Button>
        <Button radius='full' variant='solid' className='bg-[#F4F4F4] px-14 py-8'><Image src='/images/icons/facebook-logo.png' alt='apple' width={25} height={25}/></Button>
      </div>
    </div>
  )
}

export default LogIn
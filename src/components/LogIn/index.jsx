import { Button, Input } from '@nextui-org/react'
import React, { useMemo, useState } from 'react'
import { AtSymbolIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Toaster, toast } from 'react-hot-toast';
import { login } from '@/utils/actions';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const validateEmail = (email) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const validatePassword = (password) => password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/);
  const isInvalidPassword = useMemo(() => {
    if (password === "") return false;

    return validatePassword(password) ? false : true;
  }, [password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      toast.success('Inicio de sesión exitoso');
      router.push('/orders');
    } catch (error) {
      toast.error("Inicio de sesión fallido");
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
          isRequired
          isInvalid={isInvalid}
          color={isInvalid ? "danger" : "success"}
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
          isRequired
          isInvalid={isInvalidPassword}
          color={isInvalidPassword ? "danger" : "success"}
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

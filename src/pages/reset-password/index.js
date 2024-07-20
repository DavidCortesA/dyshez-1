import { LockClosedIcon, ArrowRightIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import React, {useState} from 'react'
import {Input, Button} from '@nextui-org/react';
import Link from 'next/link'
import Image from "next/image";
import {useRouter} from 'next/navigation'
import './reset.css'
import { Toaster, toast } from 'react-hot-toast'

export default function ForgotPassword(){
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter();

  const handleRecovery = async (e) => {
    e.preventDefault();

    if(password === repeatPassword){
      toast.success('Contraseña actualizada correctamente');
      setTimeout(() => {
        router.push('/');
      }, 500);
    }else{
      toast.error('Las contraseñas no coinciden')
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return(
    <main className="flex">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex-intial lg:w-2/4 w-full h-screen py-12 px-20 md:px-32">
        <h3 className="font-bold text-3xl mb-3">Reset Password</h3>
        <p className="font-normal text-lg text-gray-500 mb-10">Enter new password</p>
        <div className="mb-4">
          <Input
            type={!showPassword ? 'password' : 'text'}
            placeholder='Contraseña'
            className='bg-transparent'
            size='lg'
            radius='full'
            variant='bordered'
            startContent={
              <LockClosedIcon className='h-6 w-6 text-gray-500' />
            }
            endContent={
              <Button type='button' className="bg-transparent p-0">
                {!showPassword ? <EyeIcon className='h-6 w-6 text-gray-500' onClick={handleShowPassword} />: <EyeSlashIcon className='h-6 w-6 text-gray-500' onClick={handleShowPassword} />}
              </Button>
            }
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Input
            type={!showPassword ? 'password' : 'text'}
            placeholder='Contraseña'
            className='bg-transparent'
            size='lg'
            radius='full'
            variant='bordered'
            startContent={
              <LockClosedIcon className='h-6 w-6 text-gray-500' />
            }
            endContent={
              <Button type='button' className="bg-transparent p-0">
                {!showPassword ? <EyeIcon className='h-6 w-6 text-gray-500' onClick={handleShowPassword} />: <EyeSlashIcon className='h-6 w-6 text-gray-500' onClick={handleShowPassword} />}
              </Button>
            }
            value={repeatPassword}
            onChange={(e)=>setRepeatPassword(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col items-center mt-5 gap-4">
          <Button radius='full' variant='solid' size='lg' className='mt-8 bg-[#E3026F] text-white text-lg font-normal py-5 px-8' onClick={handleRecovery} >Continuar <ArrowRightIcon className='h-5 w-5 text-white font-bold' /></Button>
          <p className='text-center text-gray-500 text-sm'>Remember Password? <Link href='/' className="text-[#E3026F]">Login</Link> </p>
        </div>
      </div>
      <div className="flex-intial w-2/4 h-screen bg-[#f6f6f6] pb-24 lg:inline-block hidden shadow-inner">
        <Image src='/images/background-logo.png' alt="background" width={1000} height={1000} className='object-contain w-full h-full'/>
      </div>
    </main>
  )
}
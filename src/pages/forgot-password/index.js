import { AtSymbolIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import React, {useState} from 'react'
import {Input, Button} from '@nextui-org/react';
import Link from 'next/link'
import Image from "next/image";
import {useRouter} from 'next/navigation'
import './forgot.css';
import { Toaster, toast } from 'react-hot-toast'

export default function ForgotPassword(){
  const [email, setEmail] = useState('')
  const router = useRouter();

  const handleForgot = async (e) => {
    e.preventDefault();

    if(email.length > 5){
      toast.success('Correo enviado correctamente')
      setTimeout(() => {
        router.push('/reset-password');
      }, 500);
    }else{
      toast.error('Ingrese un correo valido')
    }
  }

  return(
    <main className="flex">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex-intial lg:w-2/4 w-full h-screen py-12 px-20 md:px-32">
        <h3 className="font-bold text-3xl mb-3">Forgot Password</h3>
        <p className="font-normal text-lg text-gray-500 mb-5">Enter the email associated with your account and we will send you an email with instructions for forgetting your password</p>
        <Input
          type='email'
          placeholder='Email*'
          size='lg'
          variant='bordered'
          isRequired
          startContent={
            <AtSymbolIcon className='h-6 w-6 text-gray-500' />
          }
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <div className="flex flex-col items-center mt-5 gap-4">
          <Button radius='full' variant='solid' size='lg' className='mt-8 bg-[#E3026F] text-white text-lg font-normal py-5 px-8' onClick={handleForgot} >Continuar <ArrowRightIcon className='h-5 w-5 text-white font-bold' /></Button>
          <p className='text-center text-gray-500 text-sm'>Remember Password? <Link href='/' className="text-[#E3026F]">Login</Link> </p>
        </div>
      </div>
      <div className="flex-intial w-2/4 h-screen bg-[#f6f6f6] pb-24 lg:inline-block hidden shadow-inner">
        <Image src='/images/background-logo.png' alt="background" width={1000} height={1000} className='object-contain w-full h-full'/>
      </div>
    </main>
  )
}
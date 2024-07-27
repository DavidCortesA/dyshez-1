import React, {useState, useMemo} from 'react'
import {useRouter} from 'next/navigation'
import {Button, Input, Checkbox} from '@nextui-org/react'
import {ArrowRightIcon} from '@heroicons/react/24/solid'
import {
  DevicePhoneMobileIcon,
  PhoneIcon,
  UserIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import { Toaster, toast } from 'react-hot-toast';
import { signup } from '@/utils/actions';

const Register = (props) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [celphone, setCelphone] = useState('');
  const [webSite, setWebSite] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [userInfo, setUserInfo] = useState({}); 

  const validateEmail = (email) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const formComplete = name && lastName && phone && email && password && repeatPassword && (password === repeatPassword);

  const handleSubmit = async () => {
    if(name && lastName && phone && email && password && celphone && webSite) {
      const newUserInfo = {
        name,
        lastName,
        phone,
        email,
        celphone,
        webSite
      };
      setUserInfo(newUserInfo);
      signup(userInfo)
      toast.success('Registro exitoso')
      setTimeout(()=>{
        props.setLoginTab(true)
      }, 500)
    } else {
      toast.error('Faltan datos por llenar')
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='my-8 flex flex-col items-center justify-between w-full h-full'>
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className='text-center md:text-2xl text-lg font-normal lg:w-4/5 w-full mx-auto'>Únete a la revolución, para comenzar a utilizar la plataforma ingresa los siguientes datos y se parte del movimiento de Dyshez.</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full lg:w-4/5'>
        <div className='col-span-1'>
          <Input
            type='text'
            placeholder='Nombre'
            size='lg'
            variant='bordered'
            isRequired
            startContent={
              <UserIcon className='h-6 w-6 text-gray-500'/>
            }
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className='col-span-1'>
          <Input
            type='text'
            placeholder='Apellido'
            size='lg'
            variant='bordered'
            isRequired
            startContent={
              <UserIcon className='h-6 w-6 text-gray-500'/>
            }
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
          />
        </div>
        <div className='col-span-1'>
          <Input
            type='number'
            placeholder='+52 123 456 7890 *'
            size='lg'
            variant='bordered'
            isRequired
            startContent={
              <DevicePhoneMobileIcon className='h-6 w-6 text-gray-500' />
            }
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
        </div>
        <div className='col-span-1'>
          <Input
            type='number'
            placeholder='+52 123 456 7890'
            size='lg'
            variant='bordered'
            startContent={
              <PhoneIcon className='h-6 w-6 text-gray-500'/>
            }
            value={celphone}
            onChange={(e)=>setCelphone(e.target.value)}
          />
        </div>
        <div className='col-span-1'>
          <Input
            type='text'
            placeholder='Sitio Web'
            size='lg'
            variant='bordered'
            startContent={
              <GlobeAltIcon className='h-6 w-6 text-gray-500' />
            }
            value={webSite}
            onChange={(e)=>setWebSite(e.target.value)}
          />
        </div>
        <div className='col-span-1'>
          <Input
            type='mail'
            placeholder='Correo'
            size='lg'
            variant='bordered'
            isRequired
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "success"}
            startContent={
              <EnvelopeIcon className='h-6 w-6 text-gray-500' />
            }
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className='col-span-1'>
          <Input
            type={!showPassword ? 'password' : 'text'}
            placeholder='Contraseña'
            className='bg-transparent'
            size='lg'
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
        <div className='col-span-1'>
          <Input
            type={!showPassword ? 'password' : 'text'}
            placeholder='Verificar Contraseña'
            className='bg-transparent'
            size='lg'
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
      </div>
      <div className='flex flex-col items-center'>
        <Checkbox size='lg' color='secondary'>
          Acepto los términos y condiciones
        </Checkbox>
        <Button radius='full' variant='solid' size='lg' className='mt-8 bg-[#E3026F] text-white text-lg font-normal py-5 px-8' isDisabled={!formComplete} onClick={handleSubmit} >Crear cuenta <ArrowRightIcon className='h-5 w-5 text-white font-bold' /></Button>
        <p className="text-gray-500 text-sm my-6">Si ya tienes un restaurante en Dyshez y quieres agregar una <span className='font-semibold'>nueva sucursal</span>, conoce cómo hacerlo</p>
      </div>
    </div>
  )
}

export default Register
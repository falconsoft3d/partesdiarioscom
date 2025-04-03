'use client'

import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/navigation'



// Hook Imports


const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center min-bs-[50dvh] relative p-6 overflow-x-hidden'>
      <div className='flex items-center flex-col text-center gap-10'>
        <div className='flex flex-col gap-2 is-[90vw] sm:is-[unset]'>
          <Typography className='font-medium text-8xl' color='error'>
            404
          </Typography>
          <Typography color='error' variant='h4'>Page Not Found ⚠️</Typography>
          <Typography>No pudimos encontrar la página que estás buscando.</Typography>
        </div>
        <Image
          alt='error-illustration'
          src='/images/illustrations/characters/5.png'
          className='object-cover bs-[200px] md:bs-[200px] lg:bs-[200px]'
          width={300}
          height={200}
        />
        <button onClick={()=>router.push('/')}  className='bg-[#714B67] text-white rounded-full mt-4 border border-solid py-1 p-6' >
          <i className='ri-arrow-go-back-line'></i>Regresar a Inicio
        </button>
      </div>
    
    </div>
  )
}

export default NotFoundPage
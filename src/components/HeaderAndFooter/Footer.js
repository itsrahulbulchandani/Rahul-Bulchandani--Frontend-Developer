import React from 'react'
import footer_logo from '../../images/footer_logo.webp'

export const Footer = () => {
  return (
   <div className='bg-black w-full h-40 mt-4'>
    <div className='ml-20 pt-10'>

    <img className='h-6 w-auto' src={footer_logo}></img>
    <span className='text-white text-xs'>© 2023 Bundl Technologies Pvt. Ltd</span>
    </div>
   </div>
  )
}

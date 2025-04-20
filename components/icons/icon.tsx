import React from 'react'
import Image from 'next/image'

const Icon = ({props} : {props: boolean}) => {
  return (
    <div className='relative w-20 h-20 sm:w-32 sm:h-32 mb-5 '>
        {props ? <Image fill src="/icons/approved.png" alt='icon'/> : <Image fill src="/icons/rejected.png" alt='icon'/>}
      
    </div>
  )
}

export default Icon

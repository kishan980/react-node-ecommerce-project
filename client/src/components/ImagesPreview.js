import React from 'react'

const ImagesPreview = ({url, heading}) => {
  return (
    <div className=''>
        {
           url  && 
           <div className='right-header'>
                <h1>{heading}</h1>
                <div className='w-full max-h-[190px] h-full rounded-md overflow-hidden mt-3'>
                    <img src={url} alt="img" className='w-full h-full object-cover'/>
                </div>
           </div>
        }
    </div>
  )
}

export default ImagesPreview